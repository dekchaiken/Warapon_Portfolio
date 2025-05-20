// Tooltip positioning script
document.addEventListener('DOMContentLoaded', function() {
    // Get all skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    
    // Add event listeners to position tooltips
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', positionTooltip);
    });
    
    // Function to position tooltip based on the tag's position
    function positionTooltip(event) {
        const tag = event.currentTarget;
        const tooltip = tag.querySelector('.skill-tooltip');
        
        if (!tooltip) return;
        
        // Get tag's position
        const tagRect = tag.getBoundingClientRect();
        
        // Position tooltip below the tag
        tooltip.style.top = (tagRect.bottom + 10) + 'px';
        tooltip.style.left = tagRect.left + 'px';
        
        // Check if tooltip would go off-screen to the right
        const tooltipWidth = 280; // Same as in CSS
        if (tagRect.left + tooltipWidth > window.innerWidth) {
            // Align to the right edge of the tag
            tooltip.style.left = 'auto';
            tooltip.style.right = (window.innerWidth - tagRect.right) + 'px';
        }
    }
});
