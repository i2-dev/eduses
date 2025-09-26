jQuery(function ($) {
    $(document).ready(function () {
        // 獲取 lang 屬性
        const lang = document.documentElement.getAttribute('lang');
        const $calendarGrid = $('#calendarGrid');
        const $monthText = $('.calendar-dropdown-group .month');
        const $yearText = $('.calendar-dropdown-group .year');

        // 使用 initialDate 作為固定的參考時間
        const initialDate = new Date(); // 固定的初始日期，用於年份判斷
        let currentDate = new Date();   // 用於更新和渲染日曆的變量

        let dayNames;
        let monthNames;

        if (lang === 'zh-hant' || lang === 'zh-hans') {
            monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
            dayNames = ['日', '一', '二', '三', '四', '五', '六'];
        } else {
            monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        }

        function renderCalendar(year, month) {
            $calendarGrid.empty();

            // Add day names
            $.each(dayNames, function (index, day) {
                const $dayCell = $('<div></div>').addClass('calendar-cell day-name').text(day);
                $calendarGrid.append($dayCell);
            });

            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();

            // Add empty cells for days before the first day of the month
            for (let i = 0; i < firstDay.getDay(); i++) {
                const $emptyCell = $('<div></div>').addClass('calendar-cell');
                $calendarGrid.append($emptyCell);
            }

            // Add cells for each day of the month
            for (let day = 1; day <= daysInMonth; day++) {
                const $dayWrapper = $('<div></div>').addClass('day-wrapper');
                const $dayCell = $('<div></div>').addClass('calendar-cell').html('<div class="day">' + day + '</div>');
                const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                $dayCell.attr('data-date', dateString);

                // Highlight today's date
                const today = new Date();
                if (today.getDate() === day && today.getMonth() === month && today.getFullYear() === year) {
                    $dayCell.addClass('calendar-today');
                }
                $dayWrapper.append($dayCell);
                $calendarGrid.append($dayWrapper);
            }
            $monthText.text(`${monthNames[month]}`);
            $yearText.text(`${year}`);
        }

        function updateCalendarCards(content) {
            if (content.length > 0) {
                $('.path-frontpage #block-i2-theme-content .calendar-card-section > .content').html(content);
            } else {
                // 根據語言設置日期顯示格式
                let content = '';
                if (lang === 'zh-hant') {
                    $('.path-frontpage #block-i2-theme-content .calendar-card-section .date').text(formattedDate + '日');
                    content += `
                         <section class="no-result">
                             <p>請選擇其他日子。<br/>
                             如欲了解有關節目資料，請<a href="/zh-hant/programme" role="link">瀏覽節目詳情</a>。</p>
                          </section>
                      `;
                } else if (lang === 'zh-hans') {
                    $('.path-frontpage #block-i2-theme-content .calendar-card-section .date').text(formattedDate + '日');
                    content += `
                         <section class="no-result">
                            <p>请选择其他日子。<br/>
                             如欲了解有关节目资料，请<a href="/zh-hans/programme" role="link">浏览节目详情</a>。</p>
                          </section>
                      `;
                } else {
                    $('.path-frontpage #block-i2-theme-content .calendar-card-section .date').text(formattedDate);
                    content += `
                          <section class="no-result">
                             <p>Please choose another dates. <br/>
                             For more information please visit the <a href="/programme" role="link">programme section</a>.</p>
                          </section>
                    `;
                }
                $('.path-frontpage #block-i2-theme-content .calendar-card-section > .content').html(content);
            }
        }

        // 定義 fetchEvents 函數
        async function fetchEvents() {
            try {
                // 獲取 lang 屬性
                const lang = document.documentElement.getAttribute('lang');
                // 根據 lang 屬性設置 URL
                let url;
                if (lang === 'zh-hant') {
                    url = '/zh-hant/api/calendardata-export?_format=json';
                } else if (lang === 'zh-hans') {
                    url = '/zh-hans/api/calendardata-export?_format=json';
                } else {
                    url = '/en/api/calendardata-export?_format=json'; // 默認 URL
                }
                const response = await $.ajax({
                    url: url,
                    method: 'GET',
                    dataType: 'json'
                });
                return response;
            } catch (error) {
                console.error('Error fetching events:', error);
                return [];
            }
        }

        // 定義 generateCalendarCards 函數，用於生成日曆卡片
        function generateCalendarCards(events) {
            let calendarListContent = '';

            // 如果事件列表为空，显示“无事件”信息
            if (events.length === 0) {
                // 如果沒有事件，顯示 "無結果" 信息
                if (lang === 'zh-hant') {
                    calendarListContent += `
                         <section class="no-result">
                             <p>請選擇其他日子。<br/>
                             如欲了解有關節目資料，請<a href="/zh-hant/programme" role="link">瀏覽節目詳情</a>。</p>
                          </section>
                      `;
                } else if (lang === 'zh-hans') {
                    calendarListContent += `
                         <section class="no-result">
                            <p>请选择其他日子。<br/>
                             如欲了解有关节目资料，请<a href="/zh-hans/programme" role="link">浏览节目详情</a>。</p>
                          </section>
                      `;
                } else {
                    calendarListContent += `
                          <section class="no-result">
                             <p>Please choose another dates. <br/>
                             For more information please visit the <a href="/programme" role="link">programme section</a>.</p>
                          </section>
                    `;
                }
                $('.path-frontpage #block-i2-theme-content .calendar-card-section .date').html('');
                return calendarListContent;
            }
            // 遍历事件列表，为每个事件生成卡片
            events.forEach(event => {
                var title = $.trim(event.title);
                var tags = $.trim(event.field_programme_tags);
                var venue = $.trim(event.field_venue);
                var cover = $.trim(event.field_cover);
                var venue_programme = '';
                var venue_screening = '';
                var online_screening = '';

                // 判斷是否有在現場節目
                if ($.trim(event.field_in_venue_programme_list_da) !== '') {
                    venue_programme = '1';
                } else {
                    venue_programme = '0';
                }
                // 判斷是否有在現場放映
                if ($.trim(event.field_in_venue_screening_list_da) !== '') {
                    venue_screening = '1';
                } else {
                    venue_screening = '0';
                }

                // 判斷是否有線上放映
                if ($.trim(event.field_online_screening_list_date) !== '') {
                    online_screening = '1';
                } else {
                    online_screening = '0';
                }

                // 根據語言設定標籤文字
                let venueProgrammeText = '';
                let venueScreeningText = '';
                let onlineScreeningText = '';

                if (lang === 'zh-hant') {
                    venueProgrammeText = '現場節目';
                    venueScreeningText = '現場放映';
                    onlineScreeningText = '網上放映';
                } else if (lang === 'zh-hans') {
                    venueProgrammeText = '现场节目';
                    venueScreeningText = '现场放映';
                    onlineScreeningText = '网上放映';
                } else {
                    venueProgrammeText = 'In-venue Programme';
                    venueScreeningText = 'In-venue Screening';
                    onlineScreeningText = 'Online Screening';
                }

                var link = $.trim(event.view_node);

                calendarListContent += `
                    <hr>
                    <a href="${link}" role="link" class="card calendar-card">
                        <div class="row g-0">
                            <div class="card-img">
                                <img src="/sites/default/files/image/${cover}" loading="lazy" typeof="Image" class="img-fluid" alt="">
                            </div>        
                            <div class="card-body">
                                <div class="card-tags">${tags}</div>
                                <div class="card-title">${title}</div>
                                <div class="card-venue">${venue}</div>
                                ${venue_programme === '1' ? `<div class="venue-programme">${venueProgrammeText}</div>` : ''}
                                ${venue_screening === '1' ? `<div class="venue-screening">${venueScreeningText}</div>` : ''}
                                ${online_screening === '1' ? `<div class="Online-screening">${onlineScreeningText}</div>` : ''}
                            </div>        
                        </div>
                    </a>
                `;
            });

            return calendarListContent;
        }

        function processEvents(events, year, month) {
            const today = new Date();
            const todayString = today.toISOString().split('T')[0];
            const todayEvents = [];

            events.forEach(event => {
                const dateSet = new Set();
                if (event.field_programme_date_range) {
                    const ranges = event.field_programme_date_range.split(", ");
                    ranges.forEach(range => {
                        const dates = range.split(" - ");
                        if (dates.length === 1) {
                            dateSet.add(new Date(dates[0]).toISOString().split('T')[0]);
                        } else if (dates.length === 2) {
                            const startDate = new Date(dates[0]);
                            const endDate = new Date(dates[1]);
                            for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
                                dateSet.add(d.toISOString().split('T')[0]);
                            }
                        }
                    });
                }
                event.field_programme_date_range = Array.from(dateSet).join(", ");
                // Iterate over each date in the Set
                dateSet.forEach(date => {
                    // Find the calendar cell with matching data-date
                    const $dayCell = $calendarGrid.find(`[data-date="${date}"]`);
                    if ($dayCell.length) {
                        $dayCell.addClass('has-event').attr('tabindex', '0');

                        // 根據語言設定標籤文字
                        let venueProgrammeText = '';
                        let venueScreeningText = '';
                        let onlineScreeningText = '';

                        if (lang === 'zh-hant') {
                            venueProgrammeText = '現場節目';
                            venueScreeningText = '現場放映';
                            onlineScreeningText = '網上放映';
                        } else if (lang === 'zh-hans') {
                            venueProgrammeText = '现场节目';
                            venueScreeningText = '现场放映';
                            onlineScreeningText = '网上放映';
                        } else {
                            venueProgrammeText = 'In-venue Programme';
                            venueScreeningText = 'In-venue Screening';
                            onlineScreeningText = 'Online Screening';
                        }

                        // 判斷是否顯示各類標籤
                        let venueProgram = event.field_in_venue_programme_list_da ? `<div class="venue-programme">${venueProgrammeText}</div>` : '';
                        let venueScreening = event.field_in_venue_screening_list_da ? `<div class="venue-screening">${venueScreeningText}</div>` : '';
                        let onlineScreening = event.field_online_screening_list_date ? `<div class="Online-screening">${onlineScreeningText}</div>` : '';

                        const $eventInfo = $('<div class="event-info"></div>')
                            .attr({
                                'data-title': event.title,
                                'data-tags': event.field_programme_tags,
                                'data-venue': event.field_venue,
                                'data-cover': event.field_cover,
                                'data-venue-programme': event.field_in_venue_programme_list_da,
                                'data-venue-screening': event.field_in_venue_screening_list_da,
                                'data-online-screening': event.field_online_screening_list_date,
                                'data-link': event.view_node
                            })
                            .html(`
                                <a href="${event.view_node}" role="link" class="card calendar-card">
                                    <div class="row g-0">
                                        <div class="card-img">
                                            <img src="/sites/default/files/image/${event.field_cover}" loading="lazy" typeof="Image" class="img-fluid" alt="">
                                        </div>        
                                        <div class="card-body">
                                            <div class="card-tags">${event.field_programme_tags}</div>
                                            <div class="card-title">${event.title}</div>
                                            <div class="card-venue">${event.field_venue}</div>
                                            ${venueProgram}
                                            ${venueScreening}
                                            ${onlineScreening}
                                        </div>        
                                    </div>
                                </a>
                            `);

                        $dayCell.append($eventInfo);
                    }
                    // Check if it's today's event
                    if (date === todayString) {
                        todayEvents.push(event);
                    }
                });
            });

            // Check if the current month is after May
            if (today.getMonth() > 4) {  // Month is 0-indexed, 4 means May, so > 4 means after May
                // 如果超過5月，顯示 "無結果" 信息
                // 清空日曆卡片區域
                $('.calendar-card-section .content').html('');

                // 搜集有事件的日子
                let wrapper_index = [];
                $('.calendar-grid .day-wrapper').each(function (index) {
                    if ($(this).find('.calendar-cell').hasClass('has-event')) {
                        wrapper_index.push(index);
                    }
                });

                // 如果有事件的日子，顯示事件詳情
                if (wrapper_index.length > 0) {
                    var dateStr = $('.calendar-grid .day-wrapper:not(.calendar-cell)').eq(wrapper_index[0]).find('.calendar-cell').attr('data-date');
                    var date = new Date(dateStr);
                    var formattedDate = `${monthNames[date.getMonth()].substring(0, 3)} ${date.getDate()}`;

                    // 根據語言設置日期顯示格式
                    if (lang === 'zh-hant') {
                        $('.path-frontpage #block-i2-theme-content .calendar-card-section .date').text(formattedDate + '日');
                    } else if (lang === 'zh-hans') {
                        $('.path-frontpage #block-i2-theme-content .calendar-card-section .date').text(formattedDate + '日');
                    } else {
                        $('.path-frontpage #block-i2-theme-content .calendar-card-section .date').text(formattedDate);
                    }

                    // 顯示事件卡片
                    $('.calendar-grid .day-wrapper:not(.calendar-cell)').eq(wrapper_index[0]).find('.calendar-cell .event-info').each(function () {
                        let calendarListContent = '';
                        var title = $.trim($(this).attr('data-title'));
                        var tags = $.trim($(this).attr('data-tags'));
                        var venue = $.trim($(this).attr('data-venue'));
                        var cover = $.trim($(this).attr('data-cover'));
                        var venue_programme = $.trim($(this).attr('data-venue-programme'));
                        var venue_screening = $.trim($(this).attr('data-venue-screening'));
                        var online_screening = $.trim($(this).attr('data-online-screening'));
                        var link = $.trim($(this).attr('data-link'));

                        // 根據語言設定標籤文字
                        let venueProgrammeText = '';
                        let venueScreeningText = '';
                        let onlineScreeningText = '';

                        if (lang === 'zh-hant') {
                            venueProgrammeText = '現場節目';
                            venueScreeningText = '現場放映';
                            onlineScreeningText = '網上放映';
                        } else if (lang === 'zh-hans') {
                            venueProgrammeText = '现场节目';
                            venueScreeningText = '现场放映';
                            onlineScreeningText = '网上放映';
                        } else {
                            venueProgrammeText = 'In-venue Programme';
                            venueScreeningText = 'In-venue Screening';
                            onlineScreeningText = 'Online Screening';
                        }

                        // 判斷是否顯示各類標籤
                        let venueProgramHtml = venue_programme ? `<div class="venue-programme">${venueProgrammeText}</div>` : '';
                        let venueScreeningHtml = venue_screening ? `<div class="venue-screening">${venueScreeningText}</div>` : '';
                        let onlineScreeningHtml = online_screening ? `<div class="Online-screening">${onlineScreeningText}</div>` : '';

                        calendarListContent += `
                        <hr>
                        <a href="${link}" role="link" class="card calendar-card">
                            <div class="row g-0">
                                <div class="card-img">
                                    <img src="/sites/default/files/image/${cover}" loading="lazy" typeof="Image" class="img-fluid" alt="">
                                </div>        
                                <div class="card-body">
                                    <div class="card-tags">${tags}</div>
                                    <div class="card-title">${title}</div>
                                    <div class="card-venue">${venue}</div>
                                    ${venueProgramHtml}
                                    ${venueScreeningHtml}
                                    ${onlineScreeningHtml}
                                </div>        
                            </div>
                        </a>
                        `;
                        // $('.calendar-card-section .content').append(calendarListContent);
                        // 對於日曆卡片內容的更新
                        $('.calendar-card-section .content').removeClass('show');
                        setTimeout(function () {
                            // 假設你有一個名為 calendarListContent 的變量
                            $('.calendar-card-section .content').append(calendarListContent);

                            // 加入show class觸發動畫
                            $('.calendar-card-section .content').addClass('show');
                        }, 300);
                    });
                }
            } else {
                // 否則，更新當天的事件
                const todayContent = generateCalendarCards(todayEvents);
                const date = new Date();
                const formattedDate = `${monthNames[date.getMonth()].substring(0, 3)} ${date.getDate()}`;
                if (lang === 'zh-hant') {
                    $('.path-frontpage #block-i2-theme-content .calendar-card-section .date').text(formattedDate + '日');
                } else if (lang === 'zh-hans') {
                    $('.path-frontpage #block-i2-theme-content .calendar-card-section .date').text(formattedDate + '日');
                } else {
                    $('.path-frontpage #block-i2-theme-content .calendar-card-section .date').text(formattedDate);
                }
                updateCalendarCards(todayContent);
            }
        }
        // 渲染日曆和處理點擊事件
        $('.calendar-dropdown-group .dropdown-item').on('click', async function () {
            const selectedMonth = $(this).data('month');
            // 判斷當前年份，超過5月則取明年，否則取當年
            let currentYear = initialDate.getFullYear();  // 使用 initialDate 進行年份判斷
            if (initialDate.getMonth() > 4 && selectedMonth < 5) {
                currentYear += 1;  // 超過5月，並且選擇的月份是5月以前，使用下一年
            }

            // console.log(`Year: ${currentYear}, Month: ${selectedMonth}`);

            // 設置當前選擇的月份
            currentDate.setMonth(selectedMonth);

            // 渲染日曆
            renderCalendar(currentYear, selectedMonth);
            $monthText.text(monthNames[selectedMonth]);
            $yearText.text(currentYear);

            // 獲取並處理事件
            const events = await fetchEvents();
            processEvents(events, currentYear, selectedMonth);

            // 清空日曆卡片區域
            $('.calendar-card-section .content').html('');

            // 搜集有事件的日子
            let wrapper_index = [];
            $('.calendar-grid .day-wrapper').each(function (index) {
                if ($(this).find('.calendar-cell').hasClass('has-event')) {
                    wrapper_index.push(index);
                }
            });

            // 如果有事件的日子，顯示事件詳情
            if (wrapper_index.length > 0) {
                var dateStr = $('.calendar-grid .day-wrapper:not(.calendar-cell)').eq(wrapper_index[0]).find('.calendar-cell').attr('data-date');
                var date = new Date(dateStr);
                var formattedDate = `${monthNames[date.getMonth()].substring(0, 3)} ${date.getDate()}`;

                // 根據語言設置日期顯示格式
                if (lang === 'zh-hant') {
                    $('.path-frontpage #block-i2-theme-content .calendar-card-section .date').text(formattedDate + '日');
                } else if (lang === 'zh-hans') {
                    $('.path-frontpage #block-i2-theme-content .calendar-card-section .date').text(formattedDate + '日');
                } else {
                    $('.path-frontpage #block-i2-theme-content .calendar-card-section .date').text(formattedDate);
                };

                // 顯示事件卡片
                $('.calendar-grid .day-wrapper:not(.calendar-cell)').eq(wrapper_index[0]).find('.calendar-cell .event-info').each(function () {
                    let calendarListContent = '';
                    var title = $.trim($(this).attr('data-title'));
                    var tags = $.trim($(this).attr('data-tags'));
                    var venue = $.trim($(this).attr('data-venue'));
                    var cover = $.trim($(this).attr('data-cover'));
                    var venue_programme = $.trim($(this).attr('data-venue-programme'));
                    var venue_screening = $.trim($(this).attr('data-venue-screening'));
                    var online_screening = $.trim($(this).attr('data-online-screening'));
                    var link = $.trim($(this).attr('data-link'));

                    // 根據語言設定標籤文字
                    let venueProgrammeText = '';
                    let venueScreeningText = '';
                    let onlineScreeningText = '';

                    if (lang === 'zh-hant') {
                        venueProgrammeText = '現場節目';
                        venueScreeningText = '現場放映';
                        onlineScreeningText = '網上放映';
                    } else if (lang === 'zh-hans') {
                        venueProgrammeText = '现场节目';
                        venueScreeningText = '现场放映';
                        onlineScreeningText = '网上放映';
                    } else {
                        venueProgrammeText = 'In-venue Programme';
                        venueScreeningText = 'In-venue Screening';
                        onlineScreeningText = 'Online Screening';
                    }

                    // 判斷標籤
                    var venueProgrammeTag = venue_programme !== '' ? `<div class="venue-programme">${venueProgrammeText}</div>` : '';
                    var venueScreeningTag = venue_screening !== '' ? `<div class="venue-screening">${venueScreeningText}</div>` : '';
                    var onlineScreeningTag = online_screening !== '' ? `<div class="Online-screening">${onlineScreeningText}</div>` : '';

                    calendarListContent += `
                    <hr>
                    <a href="${link}" role="link" class="card calendar-card">
                        <div class="row g-0">
                            <div class="card-img">
                                <img src="/sites/default/files/image/${cover}" loading="lazy" typeof="Image" class="img-fluid" alt="">
                            </div>        
                            <div class="card-body">
                                <div class="card-tags">${tags}</div>
                                <div class="card-title">${title}</div>
                                <div class="card-venue">${venue}</div>
                                ${venueProgrammeTag}
                                ${venueScreeningTag}
                                ${onlineScreeningTag}
                            </div>        
                        </div>
                    </a>
                    `;
                    // $('.calendar-card-section .content').append(calendarListContent);
                    // 對於日曆卡片內容的更新
                    $('.calendar-card-section .content').removeClass('show');
                    setTimeout(function () {
                        // 假設你有一個名為 calendarListContent 的變量
                        $('.calendar-card-section .content').append(calendarListContent);

                        // 加入show class觸發動畫
                        $('.calendar-card-section .content').addClass('show');
                    }, 300);
                });
            } else {
                // 如果沒有事件，顯示 "無結果" 信息
                let content = '';
                if (lang === 'zh-hant') {
                    content += `
                         <section class="no-result">
                             <p>請選擇其他日子。<br/>
                             如欲了解有關節目資料，請<a href="/zh-hant/programme" role="link">瀏覽節目詳情</a>。</p>
                          </section>
                      `;
                } else if (lang === 'zh-hans') {
                    content += `
                         <section class="no-result">
                            <p>请选择其他日子。<br/>
                             如欲了解有关节目资料，请<a href="/zh-hans/programme" role="link">浏览节目详情</a>。</p>
                          </section>
                      `;
                } else {
                    content += `
                          <section class="no-result">
                             <p>Please choose another dates. <br/>
                             For more information please visit the <a href="/programme" role="link">programme section</a>.</p>
                          </section>
                    `;
                }
                $('.path-frontpage #block-i2-theme-content .calendar-card-section .date').html('');
                $('.calendar-card-section .content').append(content);
            }
        });

        async function updateCalendar() {
            let year = currentDate.getFullYear();
            let month = currentDate.getMonth();

            // 檢查當前月份是否超過5月
            if (month > 4) {
                year += 1; // 切換到下一年
                month = 0; // 切換到1月
            }

            renderCalendar(year, month);

            const events = await fetchEvents();
            processEvents(events, year, month);
            if (month < 5) {
                $('.calendar-header .dropdown-menu .dropdown-item').eq(month).trigger("click");
            }
        };
        $('.path-frontpage #block-i2-theme-content').on('click', '.calendar-cell', function () {
            const dateValue = $(this).attr('data-date');
            const date = new Date(dateValue);
            const formattedDate = `${monthNames[date.getMonth()].substring(0, 3)} ${date.getDate()}`;
            if (lang === 'zh-hant') {
                $('.path-frontpage #block-i2-theme-content .calendar-card-section .date').text(formattedDate + '日');
            } else if (lang === 'zh-hans') {
                $('.path-frontpage #block-i2-theme-content .calendar-card-section .date').text(formattedDate + '日');
            } else {
                $('.path-frontpage #block-i2-theme-content .calendar-card-section .date').text(formattedDate);
            }
            let content = '';
            if ($(this).hasClass('has-event')) {
                // 根據語言設定標籤文字
                let venueProgrammeText = '';
                let venueScreeningText = '';
                let onlineScreeningText = '';

                if (lang === 'zh-hant') {
                    venueProgrammeText = '現場節目';
                    venueScreeningText = '現場放映';
                    onlineScreeningText = '網上放映';
                } else if (lang === 'zh-hans') {
                    venueProgrammeText = '现场节目';
                    venueScreeningText = '现场放映';
                    onlineScreeningText = '网上放映';
                } else {
                    venueProgrammeText = 'In-venue Programme';
                    venueScreeningText = 'In-venue Screening';
                    onlineScreeningText = 'Online Screening';
                }

                content = generateCalendarCards($(this).find('.event-info').map(function () {
                    // 取得資料
                    var venue_programme = $(this).attr('data-venue-programme');
                    var venue_screening = $(this).attr('data-venue-screening');
                    var online_screening = $(this).attr('data-online-screening');

                    // 回傳事件物件
                    return {
                        title: $(this).attr('data-title'),
                        field_programme_tags: $(this).attr('data-tags'),
                        field_venue: $(this).attr('data-venue'),
                        field_cover: $(this).attr('data-cover'),
                        field_in_venue_programme_list_da: venue_programme,
                        field_in_venue_screening_list_da: venue_screening,
                        field_online_screening_list_date: online_screening,
                        view_node: $(this).attr('data-link'),
                        // 新增語言相關的文字
                        labelTexts: {
                            venueProgramme: venueProgrammeText,
                            venueScreening: venueScreeningText,
                            onlineScreening: onlineScreeningText
                        }
                    };
                }).get());
            } else {
                if (lang === 'zh-hant') {
                    content += `
                         <section class="no-result">
                             <p>請選擇其他日子。<br/>
                             如欲了解有關節目資料，請<a href="/zh-hant/programme" role="link">瀏覽節目詳情</a>。</p>
                          </section>
                      `;
                } else if (lang === 'zh-hans') {
                    content += `
                         <section class="no-result">
                            <p>请选择其他日子。<br/>
                             如欲了解有关节目资料，请<a href="/zh-hans/programme" role="link">浏览节目详情</a>。</p>
                          </section>
                      `;
                } else {
                    content += `
                          <section class="no-result">
                             <p>Please choose another dates. <br/>
                             For more information please visit the <a href="/programme" role="link">programme section</a>.</p>
                          </section>
                    `;
                }
            }
            updateCalendarCards(content);
            $('.calendar-card-section .content').removeClass('show');
            setTimeout(function () {
                // 加入show class觸發動畫
                $('.calendar-card-section .content').addClass('show');
            }, 300);
        });
        // Initial load
        updateCalendar();
    });
    // 2025.3.13
    function getCurrentDate() {
        const today = new Date();

        // 獲取年份
        const year = today.getFullYear();

        // 獲取月份 (月份從0開始，所以需要+1，並且補0)
        const month = String(today.getMonth() + 1).padStart(2, '0');

        // 獲取日期 (補0)
        const day = String(today.getDate()).padStart(2, '0');

        // 組合成 YYYY-MM-DD 格式
        return `${year}-${month}-${day}`;
    }

    // 使用jQuery將日期顯示在頁面元素中
    $(document).ready(function () {
        setTimeout(function () {
            const formattedDate = getCurrentDate();
            // console.log("當前日期:", formattedDate);

            // 列出所有日期及其事件狀態，用於診斷
            // console.log("所有日期及事件狀態:");
            $('.calendar-grid .day-wrapper').each(function () {
                var date = $(this).find('.calendar-cell').attr('data-date');
                var hasEvent = $(this).find('.calendar-cell').hasClass('has-event');
                // console.log("日期:", date, "是否有事件:", hasEvent);
            });

            let currentDayFound = false;
            let nextEventFound = false;

            // 找到當天日期的元素
            let currentDayWrapper = null;
            $('.calendar-grid .day-wrapper').each(function () {
                var date = $(this).find('.calendar-cell').attr('data-date');
                if (date == formattedDate) {
                    currentDayWrapper = $(this);
                    currentDayFound = true;
                    // console.log("找到當天日期元素:", date);

                    // 如果當天有事件，直接點擊
                    if ($(this).find('.calendar-cell').hasClass('has-event')) {
                        // console.log("當天有事件，觸發點擊");
                        $(this).find('.calendar-cell.has-event')[0].click(); // 直接點擊事件單元格
                        nextEventFound = true;
                        return false; // 跳出循環
                    } else {
                        // console.log("當天沒有事件");
                    }
                }
            });

            // console.log("當天日期是否找到:", currentDayFound);
            // console.log("當天是否有事件:", nextEventFound);

            // 如果當天沒有事件，尋找之後最近的有事件的日期
            if (currentDayFound && !nextEventFound) {
                // console.log("開始尋找之後最近的有事件日期");
                let nextEventWrapper = null;

                // 獲取所有日期元素
                let allDayWrappers = $('.calendar-grid .day-wrapper');
                let currentIndex = allDayWrappers.index(currentDayWrapper);
                // console.log("當前日期索引:", currentIndex);

                // 從當前日期之後開始遍歷
                for (let i = currentIndex + 1; i < allDayWrappers.length; i++) {
                    let wrapper = allDayWrappers.eq(i);
                    let cellElement = wrapper.find('.calendar-cell');
                    let hasEvent = cellElement.hasClass('has-event');
                    let date = cellElement.attr('data-date');

                    // console.log("檢查日期:", date, "是否有事件:", hasEvent);

                    if (hasEvent) {
                        nextEventWrapper = wrapper;
                        // console.log("找到下一個有事件的日期:", date);
                        break;
                    }
                }

                // 如果找到了下一個有事件的日期，觸發點擊
                if (nextEventWrapper) {
                    let eventDate = nextEventWrapper.find('.calendar-cell').attr('data-date');
                    // console.log("嘗試點擊有事件的日期:", eventDate);

                    // 嘗試多種點擊方法
                    try {
                        // 1. 直接點擊事件單元格
                        let eventCell = nextEventWrapper.find('.calendar-cell.has-event');
                        // console.log("事件單元格:", eventCell.length > 0 ? "找到" : "未找到");

                        if (eventCell.length > 0) {
                            // console.log("使用原生JS點擊");
                            eventCell[0].click();
                        } else {
                            // 2. 如果沒有找到事件單元格，嘗試點擊整個wrapper
                            // console.log("點擊整個wrapper");
                            nextEventWrapper[0].click();
                        }
                    } catch (e) {
                        // console.error("點擊時發生錯誤:", e);
                    }

                    // console.log("點擊觸發完成");
                } else {
                    // console.log("沒有找到之後有事件的日期");
                }
            }
        }, 1000); // 增加延遲時間，確保日曆完全加載
    });
});