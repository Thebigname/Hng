 function updateTime() {
            const timeElement = document.querySelector('[data-testid="test-user-time"]');
            if (timeElement) {
                timeElement.textContent = Date.now();
            }
        }

        updateTime();
        setInterval(updateTime, 1000);

        document.addEventListener('DOMContentLoaded', () => {
            const links = document.querySelectorAll('.social-link');
            links.forEach(link => {
                link.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        link.click();
                    }
                });
            });
        });