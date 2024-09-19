(function () {
    'use strict';

    // Fetch the form and input elements
    const form = document.getElementById('bmiForm');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');

    // Validate input fields as the user types
    weightInput.addEventListener('input', function () {
        validateField(weightInput);
    });

    heightInput.addEventListener('input', function () {
        validateField(heightInput);
    });

    // Prevent form submission if validation fails
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault(); // Stop form submission and calculate BMI
            calculateBMI();
        }
        form.classList.add('was-validated');
    }, false);

    // Function to validate a single field
    function validateField(input) {
        if (input.checkValidity()) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }
    }
})();

function calculateBMI() {
    // Get input values
    const weight = parseFloat(document.getElementById('weight').value);
    const height_cm = parseFloat(document.getElementById('height').value);

    if (isNaN(weight) || isNaN(height_cm)) {
        return;
    }

    // Convert height to meters
    const height_m = height_cm / 100;

    // Calculate BMI
    const bmi = weight / (height_m ** 2);

    // Calculate normal weight range
    const min_normal_weight = 18.5 * (height_m ** 2);
    const max_normal_weight = 24.9 * (height_m ** 2);

    // Determine weight to gain or lose
    let message = `Your BMI is: <span class="bmi-value">${bmi.toFixed(2)}</span><br>`;
    if (weight > max_normal_weight) {
        const weight_to_lose = weight - max_normal_weight;
        message += `You need to lose <span class="weight-change">${weight_to_lose.toFixed(2)} kg</span> to reach a normal BMI.`;
    } else if (weight < min_normal_weight) {
        const weight_to_gain = min_normal_weight - weight;
        message += `You need to gain <span class="weight-change">${weight_to_gain.toFixed(2)} kg</span> to reach a normal BMI.`;
    } else {
        message += `Your weight is within the normal BMI range.`;
    }

    // Display result
    document.getElementById('result').innerHTML = message;
}
