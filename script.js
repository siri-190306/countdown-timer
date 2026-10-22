const dateInput = document.getElementById("targetDate");
const startBtn = document.getElementById("startBtn");
const message = document.getElementById("message");

let countdownInterval;

const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
dateInput.min = now.toISOString().slice(0, 16);

startBtn.addEventListener("click", function () {
    const selectedDate = dateInput.value;

    if (!selectedDate) {
        message.textContent = "Hey! Please choose a date first. 💗";
        return;
    }

    const targetTime = new Date(selectedDate).getTime();

    if (targetTime <= Date.now()) {
        message.textContent = "Oops! Choose a future date, please. 🌸";
        clearInterval(countdownInterval);
        return;
    }

    clearInterval(countdownInterval);

    message.textContent = "Your countdown is running. Good things take time! ✨";

    function updateCountdown() {
        const currentTime = Date.now();
        const difference = targetTime - currentTime;

        if (difference <= 0) {
            clearInterval(countdownInterval);

            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";

            message.textContent = "The wait is over! Your special moment is here! 🎉";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );
        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );
        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        document.getElementById("days").textContent =
            String(days).padStart(2, "0");

        document.getElementById("hours").textContent =
            String(hours).padStart(2, "0");

        document.getElementById("minutes").textContent =
            String(minutes).padStart(2, "0");

        document.getElementById("seconds").textContent =
            String(seconds).padStart(2, "0");
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
});