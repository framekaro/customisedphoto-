document.addEventListener("DOMContentLoaded", () => {

    const brandName = document.querySelectorAll("[data-business-name]");
    const tagline = document.querySelectorAll("[data-tagline]");

    brandName.forEach(element => {
        element.textContent = FRAMEKARO_CONFIG.businessName;
    });

    tagline.forEach(element => {
        element.textContent = FRAMEKARO_CONFIG.tagline;
    });

});
