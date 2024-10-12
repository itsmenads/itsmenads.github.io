function openSidebar()
{
    if (window.innerWidth >= 993)
    {
        return;
    }

    openOverlay();

    let sidebar = document.getElementById("sidebar");

    sidebar.classList.add("animateInFromLeft");
    sidebar.style.display = "block";
    document.getElementById("overlay").style.display = "block";
    setTimeout(function() {
        sidebar.classList.remove("animateInFromLeft");
    }, 300);
}

function closeSidebar()
{
    if (window.innerWidth >= 993)
    {
        return;
    }

    closeOverlay();

    let sidebar = document.getElementById("sidebar");

    sidebar.classList.add("animateOutToLeft");
    setTimeout(function() {
        sidebar.style.display = "none";
        sidebar.classList.remove("animateOutToLeft");
    }, 200);
}

function openProjectDetails(detailElement)
{
    openOverlay();

    detailElement.classList.add("animateZoomIn");
    detailElement.style.display='block';
    document.getElementById("overlay").style.zIndex = "3";
    setTimeout(function() {
        detailElement.classList.remove("animateZoomIn");
    }, 300);
}

function closeProjectDetails(detailElement)
{
    closeOverlay();

    detailElement.classList.add("animateZoomOut");
    setTimeout(function() {
        detailElement.style.display = "none";
        detailElement.classList.remove("animateZoomOut");
        document.getElementById("overlay").style.zIndex = "2";
    }, 200);
}

function openOverlay()
{
    let overlay = document.getElementById("overlay");

    overlay.style.display = "block";
    overlay.classList.add("animateOpacityIn");
    setTimeout(function() {
        overlay.classList.remove("animateOpacityIn");
    }, 300);
}

function closeOverlay()
{
    let overlay = document.getElementById("overlay");

    overlay.classList.add("animateOpacityOut");
    setTimeout(function() {
        overlay.style.display = "none";
        overlay.classList.remove("animateOpacityOut");
    }, 200);
}

function closeEverything()
{
    closeSidebar();

    let modalElements = document.getElementsByClassName("modal");

    for (let modalElement of modalElements)
    {
        closeProjectDetails(modalElement);
    }
}

let currentPageNumber = 0;

function changePage(targetPage)
{
    if (targetPage === currentPageNumber)
    {
        return;
    }

    window.scrollTo({ top: 70, behavior: "smooth"});

    closePage(currentPageNumber);
    setTimeout(function(){
        openPage(targetPage);
    }, 600);
    currentPageNumber = targetPage;
}

function openPage(pageNumber)
{
    let pageElements = getProjectElementsOfPage(pageNumber);

    let pageNumberButtonString = "page" + pageNumber + "Button";
    let pageNumberButton = document.getElementById(pageNumberButtonString);

    pageNumberButton.classList.add("grayButton");
    pageNumberButton.classList.remove("w3-white");

    for (let pageElement of pageElements)
    {
        if (!pageElement)
        {
            continue;
        }

        pageElement.style.display = "block";
        pageElement.classList.add("animateOpacityIn");
        setTimeout(function() {
            pageElement.classList.remove("animateOpacityIn");
        }, 300);
    }
}

function closePage(pageNumber)
{
    let pageElements = getProjectElementsOfPage(pageNumber);
    let pageNumberButtonString = "page" + pageNumber + "Button";
    let pageNumberButton = document.getElementById(pageNumberButtonString);

    pageNumberButton.classList.remove("grayButton");
    pageNumberButton.classList.add("w3-white");

    for (let pageElement of pageElements)
    {
        if (!pageElement)
        {
            continue;
        }

        pageElement.classList.add("animateOpacityOut");
        setTimeout(function() {
            pageElement.style.display = "none";
            pageElement.classList.remove("animateOpacityOut");
        }, 300);
    }
}

function goTo(element)
{
    scrollToElement(element);
    closeSidebar();
}

function goToLastPage()
{
    let pageAmount = getPageAmount();

    changePage(pageAmount - 1);
}

function scrollToElement(element)
{
    let yPos = element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({ top: yPos, behavior: "smooth"});
}

const Filters = Object.freeze({
    All: 0,
    Unity: 1,
    Unreal: 2,
    Personal: 3,
    University: 4,
    CSharp: 5,
    CPlusPlus: 6,
    Python: 7,
    JavaScript: 8,
    VR: 9,
})

let filters = [true, false, false, false, false, false, false, false, false, false];
let previousFilter = Filters.All;

function selectFilter(filter)
{
    if (filter === Filters.All)
    {
        // show everything
        for (let i = 0; i < filters.length; i++)
        {
            let buttonElement = document.getElementById("filterButton" + i);
            let buttonCloseElement = document.getElementById("filterButtonClose" + i);

            if (i === Filters.All)
            {
                buttonElement.classList.add("w3-black");
                buttonElement.classList.remove("w3-white");
                continue;
            }

            filters[i] = false;

            buttonElement.classList.add("w3-white");
            buttonElement.classList.remove("w3-grey");
            buttonCloseElement.style.display = "none";
        }
        previousFilter = Filters.All;

        checkProjectFilters();
        changePage(0);
        console.log(filters);
        return;
    }

    if (previousFilter === Filters.All)
    {
        for (let i = 0; i < filters.length; i++)
        {
            filters[i] = false;
            let buttonElement = document.getElementById("filterButton" + i);
            buttonElement.classList.add("w3-white");
            buttonElement.classList.remove("w3-grey");
        }
    }

    filters[filter] = !filters[filter];

    let buttonElement = document.getElementById("filterButton" + filter);
    let buttonCloseElement = document.getElementById("filterButtonClose" + filter);
    if (filters[filter])
    {
        buttonElement.classList.add("w3-grey");
        buttonElement.classList.remove("w3-white");
        buttonCloseElement.style.display = "block";
    }
    else
    {
        buttonElement.classList.add("w3-white");
        buttonElement.classList.remove("w3-grey");
        buttonCloseElement.style.display = "none";
    }

    previousFilter = filter;

    let allFiltersTrue = true;
    for (let i = 0; i < filters.length; i++)
    {
        if (i === 0)
        {
            continue;
        }

        if (filters[i])
        {
            allFiltersTrue = false;
        }
    }

    if (allFiltersTrue)
    {
        filters[0] = true;
        let buttonElementAll = document.getElementById("filterButton0");
        buttonElementAll.classList.add("w3-grey");
        buttonElementAll.classList.remove("w3-white");
        previousFilter = Filters.All;
    }

    checkProjectFilters();
    changePage(0);
}

const projectElements = document.getElementsByClassName("project");

function checkProjectFilters()
{
    for (let projectElement of projectElements)
    {
        if (filters[0])
        {
            projectElement.classList.add("shouldDisplay");
            continue;
        }


        for (const filterValue in Filters) {
            if (filters[Filters[filterValue]] && !projectElement.classList.contains(`class${Filters[filterValue]}`))
            {
                projectElement.classList.remove("shouldDisplay");
                break;
            }
            else
            {
                projectElement.classList.add("shouldDisplay");
            }
        }
    }

    displayProjects();
}

function displayProjects()
{
    for (let projectElement of projectElements)
    {
        if (!projectElement.classList.contains("shouldDisplay"))
        {
            projectElement.style.display = "none";
        }
    }

    let shouldDisplayElements = document.getElementsByClassName("shouldDisplay");

    if (shouldDisplayElements.length <= 6)
    {
        for (let shouldDisplayElement of shouldDisplayElements)
        {
            shouldDisplayElement.style.display = "block";
        }

        updatePagination();
        return;
    }

    for (let i = 0; i < shouldDisplayElements.length; i++)
    {
        if ((i === currentPageNumber * 6) || (i === currentPageNumber * 6 + 1) || (i === currentPageNumber * 6 + 2) ||
            (i === currentPageNumber * 6 + 3) || (i === currentPageNumber * 6 + 4) || (i === currentPageNumber * 6 + 5))
        { // current page
            shouldDisplayElements[i].style.display = "block";
        }
        else
        {
            shouldDisplayElements[i].style.display = "none";
        }
    }

    updatePagination();
}

function getProjectElementsOfPage(pageNumber)
{
    let shouldDisplayElements = document.getElementsByClassName("shouldDisplay");

    if (shouldDisplayElements.length === 0)
    {
        return []; // Return empty array if no elements found
    }


    let elements = [];

    const startIndex = pageNumber * 6;
    const endIndex = Math.min(startIndex + 6, shouldDisplayElements.length);

    for (let i = startIndex; i < endIndex; i++)
    {
        elements.push(shouldDisplayElements[i]);
    }
    return elements;
}

function updatePagination()
{
    let pageNumbers = getPageAmount();

    let pageArrows = document.getElementsByClassName("pageArrows");
    let noProjectButton = document.getElementById("noProjectButton");

    if (pageNumbers <= 0)
    {
        for (let pageArrow of pageArrows)
        {
            pageArrow.style.display = "none";
            noProjectButton.style.display = "block";
        }
    }
    else
    {
        for (let pageArrow of pageArrows)
        {
            pageArrow.style.display = "block";
            noProjectButton.style.display = "none";
        }
    }

    const pageNumberButtons = [];

    for (let i = 0; i < 4; i++)
    {
        let pageNumberButtonString = "page" + i + "Button";
        let pageNumberButton = document.getElementById(pageNumberButtonString);

        pageNumberButtons.push(pageNumberButton);
        pageNumberButton.style.display = "none";
    }

    for (let i = 0; i < pageNumbers; i++)
    {
        pageNumberButtons[i].style.display = "block";
    }
}

function getPageAmount()
{
    let shouldDisplayElements = document.getElementsByClassName("shouldDisplay");

    let pageNumbers = Math.floor(shouldDisplayElements.length / 6);
    if (shouldDisplayElements.length % 6 !== 0)
    {
        pageNumbers += 1;
    }

    if (pageNumbers > 4)
    {
        console.error("Too many page numbers: " + pageNumbers);
        return pageNumbers;
    }
    return pageNumbers;
}

function copyEmailToClipboard()
{
    navigator.clipboard.writeText("calvinsetia@gmail.com");
}

function autoOpenProjectDetails()
{
    const projectIndex = localStorage.getItem('projectIndex');

    if (!projectIndex)
    {
        return;
    }

    openProjectDetails(document.getElementById('project' + projectIndex + 'Modal'));

    localStorage.removeItem('projectIndex');
}

document.addEventListener('DOMContentLoaded', autoOpenProjectDetails)