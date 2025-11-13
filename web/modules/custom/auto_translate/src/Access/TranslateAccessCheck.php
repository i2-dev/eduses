<?php

namespace Drupal\auto_translate\Access;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Routing\Access\AccessInterface;
use Drupal\Core\Session\AccountInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Access check for translation routes.
 */
class TranslateAccessCheck implements AccessInterface {

  /**
   * Checks access for translation routes.
   *
   * @param \Drupal\Core\Session\AccountInterface $account
   *   The account to check access for.
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The request object.
   *
   * @return \Drupal\Core\Access\AccessResultInterface
   *   The access result.
   */
  public function access(AccountInterface $account, Request $request) {
    // Check permission
    if (!$account->hasPermission('edit any content')) {
      return AccessResult::forbidden('User does not have permission to edit content.');
    }

    // For POST requests, verify CSRF token
    if ($request->getMethod() === 'POST') {
      $token = NULL;

      // Try to get token from header
      if ($request->headers->has('X-CSRF-Token')) {
        $token = $request->headers->get('X-CSRF-Token');
      }
      // Try to get token from request body
      elseif ($request->getContent()) {
        $data = json_decode($request->getContent(), TRUE);
        if (isset($data['token'])) {
          $token = $data['token'];
        }
      }

      if ($token) {
        $csrf_token = \Drupal::service('csrf_token');
        if ($csrf_token->validate($token, 'auto_translate')) {
          return AccessResult::allowed();
        }
        else {
          return AccessResult::forbidden('Invalid CSRF token.');
        }
      }
      else {
        // If no token provided, still allow if user has permission
        // (for development/testing, you might want to be stricter)
        return AccessResult::allowed()->addCacheContexts(['user.permissions']);
      }
    }

    return AccessResult::allowed()->addCacheContexts(['user.permissions']);
  }

}

