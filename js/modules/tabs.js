function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    //TABS START
    const tabs = document.querySelectorAll(tabsSelector), // пункт меню '.tabheader__item'
        tabsContent = document.querySelectorAll(tabsContentSelector), // дискрай '.tabcontent'
        tabsParent = document.querySelector(tabsParentSelector); // блок с пунктами '.tabheader__items'


    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass); //'tabheader__item_active'
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (item === target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
// TABS END
}

export default tabs;
