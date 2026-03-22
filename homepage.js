document.addEventListener("DOMContentLoaded", () => {
  const sportCards = document.querySelectorAll(".sport-card");

  const nextToStep2Btn = document.getElementById("next-to-step2");
  const nextToStep3Btn = document.getElementById("next-to-step3");
  const nextToStep4Btn = document.getElementById("next-to-step4");

  const backToStep1Btn = document.getElementById("back-to-step1");
  const backToStep2Btn = document.getElementById("back-to-step2");
  const backToStep3Btn = document.getElementById("back-to-step3");

  const stepContents = {
    1: document.getElementById("step1-content"),
    2: document.getElementById("step2-content"),
    3: document.getElementById("step3-content"),
    4: document.getElementById("step4-content"),
  };

  const stepDots = {
    1: document.getElementById("step1"),
    2: document.getElementById("step2"),
    3: document.getElementById("step3"),
    4: document.getElementById("step4"),
  };

  const bookingDateInput = document.getElementById("bookingDate");
  const durationRadios = document.querySelectorAll("input[name='duration']");
  const timeSlotsContainer = document.getElementById("timeSlots");
  const courtOptionsContainer = document.getElementById("courtOptions");
  const playerCountInput = document.getElementById("playerCount");
  const specialRequestsInput = document.getElementById("specialRequests");

  const summaryContainer = document.getElementById("summary-content");

  const confirmSport = document.getElementById("confirm-sport");
  const confirmDate = document.getElementById("confirm-date");
  const confirmTime = document.getElementById("confirm-time");
  const confirmDuration = document.getElementById("confirm-duration");
  const confirmCourt = document.getElementById("confirm-court");
  const confirmPlayers = document.getElementById("confirm-players");
  const confirmRequests = document.getElementById("confirm-requests");

  const confirmBookingBtn = document.getElementById("confirm-booking");
  const successModalEl = document.getElementById("successModal");
  let successModal = null;
  if (successModalEl && window.bootstrap) {
    successModal = new bootstrap.Modal(successModalEl);
  }

  let selectedSport = null;
  let selectedDate = null;
  let selectedTime = null;
  let selectedDuration = 1;
  let selectedCourt = null;

  const sportLabels = {
    padel: "Padel",
    basketball: "Basketball",
    football: "Football",
    volleyball: "Volleyball",
  };

  const timeSlots = [
    "09:00",
    "10:30",
    "12:00",
    "13:30",
    "15:00",
    "16:30",
    "18:00",
    "19:30",
  ];

  const courtsBySport = {
    padel: [
      "Padel Court 1",
      "Padel Court 2",
      "Padel Court 3",
      "Padel Court 4",
    ],
    basketball: [
      "Basketball Court 1",
      "Basketball Court 2",
    ],
    football: [
      "Football Field 1",
      "Football Field 2",
      "Football Field 3",
    ],
    volleyball: [
      "Volleyball Court 1",
      "Volleyball Court 2",
    ],
  };

  function goToStep(stepNumber) {
    Object.values(stepContents).forEach((el) => el.classList.add("hidden"));
    Object.values(stepDots).forEach((dot) => {
      dot.classList.remove("active", "completed");
    });

    if (stepContents[stepNumber]) {
      stepContents[stepNumber].classList.remove("hidden");
    }
    for (let i = 1; i < stepNumber; i++) {
      if (stepDots[i]) stepDots[i].classList.add("completed");
    }
    if (stepDots[stepNumber]) {
      stepDots[stepNumber].classList.add("active");
    }
  }

  function updateSummary() {
    if (!selectedSport) {
      summaryContainer.innerHTML =
        '<p class="text-muted">Select a sport to see your booking details.</p>';
      return;
    }

    const durationHours = Number(selectedDuration || 1);
    const dateText = selectedDate || "Not selected";
    const timeText = selectedTime || "Not selected";
    const courtText = selectedCourt || "Not selected";

    summaryContainer.innerHTML = `
      <div class="summary-item">
        <span>Sport</span>
        <span>${sportLabels[selectedSport] || selectedSport}</span>
      </div>
      <div class="summary-item">
        <span>Date</span>
        <span>${dateText}</span>
      </div>
      <div class="summary-item">
        <span>Time</span>
        <span>${timeText}</span>
      </div>
      <div class="summary-item">
        <span>Duration</span>
        <span>${durationHours} hour(s)</span>
      </div>
      <div class="summary-item">
        <span>Court</span>
        <span>${courtText}</span>
      </div>
      <div class="summary-item total-cost">
        <span>Price</span>
        <span>Free booking</span>
      </div>
    `;
  }

  function generateTimeSlots() {
    if (!timeSlotsContainer) return;
    timeSlotsContainer.innerHTML = "";
    selectedTime = null;
    if (nextToStep3Btn) nextToStep3Btn.disabled = true;

    timeSlots.forEach((slot) => {
      const div = document.createElement("div");
      div.className = "time-slot";
      div.textContent = slot;
      div.dataset.time = slot;

      div.addEventListener("click", () => {
        document
          .querySelectorAll(".time-slot")
          .forEach((el) => el.classList.remove("selected"));
        div.classList.add("selected");
        selectedTime = slot;
        if (nextToStep3Btn) nextToStep3Btn.disabled = false;
        updateSummary();
      });

      timeSlotsContainer.appendChild(div);
    });
  }

  function formatDate(value) {
    if (!value) return "";
    const d = new Date(value);
    if (isNaN(d)) return value;
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function generateCourtsForSport() {
    if (!courtOptionsContainer) return;

    courtOptionsContainer.innerHTML = "";
    selectedCourt = null;
    if (nextToStep4Btn) nextToStep4Btn.disabled = true;

    if (!selectedSport) {
      courtOptionsContainer.innerHTML =
        '<p class="text-muted">Please go back and select a sport first.</p>';
      return;
    }

    const courts = courtsBySport[selectedSport] || [];

    if (courts.length === 0) {
      courtOptionsContainer.innerHTML =
        '<p class="text-danger fw-semibold">No courts available for this sport.</p>';
      updateSummary();
      return;
    }

    courts.forEach((name, index) => {
      const div = document.createElement("div");
      div.className = "court-option";
      div.dataset.court = name;

      div.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h6 class="mb-1">${name}</h6>
            <small class="text-muted">Free booking</small>
          </div>
          <span class="badge bg-success">${
            index === 0 ? "Most Available" : "Available"
          }</span>
        </div>
      `;

      div.addEventListener("click", () => {
        document
          .querySelectorAll(".court-option")
          .forEach((el) => el.classList.remove("selected"));
        div.classList.add("selected");
        selectedCourt = name;
        if (nextToStep4Btn) nextToStep4Btn.disabled = false;
        updateSummary();
      });

      courtOptionsContainer.appendChild(div);
    });
  }

  function getCurrentUser() {
    const userId = localStorage.getItem('userId');
    const userFullName = localStorage.getItem('userFullName');
    
    if (userId) {
      return {
        id: userId,
        fullName: userFullName,
        username: localStorage.getItem('username') || 'User'
      };
    }
    
    return null;
  }

  function saveCourtBooking(bookingData) {
      const currentUser = getCurrentUser();
      if (!currentUser) {
          console.error('No user logged in');
          return false;
      }
      
      const userBookingsKey = `userCourtBookings_${currentUser.id}`;
      const existingBookings = JSON.parse(localStorage.getItem(userBookingsKey) || '[]');
      
      const newBooking = {
          id: 'booking-' + Date.now(),
          sport: selectedSport,
          court: selectedCourt,
          date: selectedDate,
          time: selectedTime,
          duration: selectedDuration,
          players: playerCountInput.value,
          requests: specialRequestsInput.value,
          bookedAt: new Date().toISOString(),
          status: 'confirmed'
      };
      
      existingBookings.push(newBooking);
      localStorage.setItem(userBookingsKey, JSON.stringify(existingBookings));
      
      window.dispatchEvent(new CustomEvent('profileDataUpdated'));
      localStorage.setItem('profileNeedsRefresh', Date.now().toString());
      
      console.log('Court booking saved and profile update triggered');
      
      return true;
  }

  function triggerProfileUpdate() {
    window.dispatchEvent(new CustomEvent('profileDataUpdated'));
    localStorage.setItem('profileNeedsRefresh', Date.now().toString());
  }

  if (bookingDateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    bookingDateInput.min = `${yyyy}-${mm}-${dd}`;

    bookingDateInput.addEventListener("change", (e) => {
      selectedDate = formatDate(e.target.value);
      updateSummary();
    });
  }

  durationRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      selectedDuration = e.target.value;
      updateSummary();
    });
  });

  generateTimeSlots();
  updateSummary();
  goToStep(1);

  sportCards.forEach((card) => {
    card.addEventListener("click", () => {
      sportCards.forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      selectedSport = card.dataset.sport;
      if (nextToStep2Btn) nextToStep2Btn.disabled = false;
      updateSummary();
    });
  });

  if (nextToStep2Btn) {
    nextToStep2Btn.addEventListener("click", () => {
      if (!selectedSport) return;
      goToStep(2);
    });
  }

  if (backToStep1Btn) {
    backToStep1Btn.addEventListener("click", () => {
      goToStep(1);
    });
  }

  if (nextToStep3Btn) {
    nextToStep3Btn.addEventListener("click", () => {
      if (!selectedTime) return;
      generateCourtsForSport();
      goToStep(3);
    });
  }

  if (backToStep2Btn) {
    backToStep2Btn.addEventListener("click", () => {
      goToStep(2);
    });
  }

  if (nextToStep4Btn) {
    nextToStep4Btn.addEventListener("click", () => {
      confirmSport.textContent = sportLabels[selectedSport] || selectedSport || "-";
      confirmDate.textContent = selectedDate || "-";
      confirmTime.textContent = selectedTime || "-";
      confirmDuration.textContent = selectedDuration
        ? `${selectedDuration} hour(s)`
        : "-";
      confirmCourt.textContent = selectedCourt || "-";
      confirmPlayers.textContent = playerCountInput.value || "-";
      confirmRequests.textContent =
        (specialRequestsInput.value && specialRequestsInput.value.trim()) || "None";

      goToStep(4);
    });
  }

  if (backToStep3Btn) {
    backToStep3Btn.addEventListener("click", () => {
      goToStep(3);
    });
  }

  if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener("click", () => {
      const bookingData = {
        sport: selectedSport,
        court: selectedCourt,
        date: selectedDate,
        time: selectedTime,
        duration: selectedDuration,
        players: playerCountInput.value,
        requests: specialRequestsInput.value
      };
      
      if (saveCourtBooking(bookingData)) {
        if (successModal) {
          successModal.show();
          
          successModalEl.addEventListener('hidden.bs.modal', function() {
            if (window.location.pathname.includes('profile.html')) {
              window.location.reload();
            }
          });
        } else {
          alert("Booking confirmed!");
          
          if (window.location.pathname.includes('profile.html')) {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        }
      } else {
        alert("Failed to save booking. Please try again.");
      }
    });
  }

  setTimeout(() => {
    createSampleBookings();
  }, 1000);
});

function createSampleBookings() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  
  const userBookingsKey = `userCourtBookings_${currentUser.id}`;
  const existingBookings = JSON.parse(localStorage.getItem(userBookingsKey) || '[]');
  
  if (existingBookings.length === 0) {
    const sampleBookings = [
      { 
        id: 'booking-sample-1',
        sport: 'basketball', 
        court: 'Basketball Court 1',
        date: '2025-10-20', 
        time: '15:00',
        duration: 1.5,
        players: 4,
        requests: '',
        bookedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed'
      },
      { 
        id: 'booking-sample-2',
        sport: 'padel', 
        court: 'Padel Court 3',
        date: '2025-10-22', 
        time: '16:30',
        duration: 1,
        players: 2,
        requests: 'Need rackets',
        bookedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'upcoming'
      }
    ];
    
    localStorage.setItem(userBookingsKey, JSON.stringify(sampleBookings));
    triggerProfileUpdate();
  }
}

function getCurrentUser() {
  const userId = localStorage.getItem('userId');
  const userFullName = localStorage.getItem('userFullName');
  
  if (userId) {
    return {
      id: userId,
      fullName: userFullName,
      username: localStorage.getItem('username') || 'User'
    };
  }
  
  return null;
}

function triggerProfileUpdate() {
  window.dispatchEvent(new CustomEvent('profileDataUpdated'));
  localStorage.setItem('profileNeedsRefresh', Date.now().toString());
}