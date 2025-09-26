window.onload = function () {
    // /* all items Intersection */
    // const allitems = document.querySelectorAll('.obs-items');

    // const revealItems = function (entry, observer) {        
    //     if (!entry.isIntersecting) return;        
    //     entry.target.classList.add('obs-active');
    //     observer.unobserve(entry.target);        
        
    //     console.log(entry);
    // };

    // const observerOptions = {
    //     root: null,        
    //     threshold: [0.5],        
    //     rootMargin: "0px 0px 0px 0px",
    // };

    // const itemsObserver = new IntersectionObserver((entries, observer) => {
    //     entries.forEach(entry => revealItems(entry, observer));
    // }, observerOptions);

    // allitems.forEach(item => itemsObserver.observe(item));

    /* news bubble Intersection */
    const onLoadItems = document.querySelectorAll('.onload-items');

    // //start balloom     
    onLoadItems.forEach(function (item) {
        item.classList.add('onload-active');
    });
};
