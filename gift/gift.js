const passwordDigest = 'f19f9167fd17127d80d6b1bc5eb92f9efa8a836dac6439f53b8a77c3eac63284';

const questions = [
    {
        prompt: 'The sourdough starter is bubbling and claims it’s the third homeowner. What do you tell it?',
        answers: ['Pay rent in bubbles', 'No voting rights until you can make focaccia']
    },
    {
        prompt: 'It was fed at 3 a.m. again. Whose birthday is it, exactly?',
        answers: ['The human homeowner’s', 'The starter’s. We’re all just guests here']
    },
    {
        prompt: 'A loaf has come out of the oven with a message in its crust. What does it say?',
        answers: ['Feed me', 'Stop checking on me every four minutes']
    },
    {
        prompt: 'For birthday evening, the kitchen is under a temporary no-kneading order. How will you cope?',
        answers: ['Panic', 'Leave the house before someone starts another loaf']
    },
    {
        prompt: 'The plan involves live music. Do you need to bring your apron?',
        answers: ['Obviously, one never knows', 'No, tonight the oven is someone else’s problem']
    },
    {
        prompt: 'Destination confirmed: Helsinki. Should the starter come too?',
        answers: ['It gets its own jar', 'It can proof at home']
    },
    {
        prompt: 'A plus-one has been approved. Who gets the second place?',
        answers: ['A human accomplice', 'The loaf, if it behaves']
    },
    {
        prompt: 'One sealed envelope remains. The starter is vibrating. Do you open it?',
        answers: ['Open it', 'Let the dough decide']
    }
];

const reveal = 'Happy birthday! Your gift is two tickets to see Zucchero in Helsinki. Bring a human accomplice. The starter stays home and gets fed.';

async function verifyPassword(value, expectedDigest = passwordDigest) {
    const digest = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(value.trim()));
    const actualDigest = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
    return actualDigest === expectedDigest;
}

function getVisibleStep(index) {
    return index < questions.length
        ? { type: 'question', ...questions[index] }
        : { type: 'reveal', content: reveal };
}

if (typeof module !== 'undefined') {
    module.exports = { getVisibleStep, questions, verifyPassword };
}

if (typeof document !== 'undefined') {
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('gift-password');
    const passwordError = document.getElementById('password-error');
    const gate = document.getElementById('password-gate');
    const quiz = document.getElementById('quiz');
    const prompt = document.getElementById('question-prompt');
    const answers = document.getElementById('question-answers');
    const progress = document.getElementById('question-progress');
    const progressRow = document.querySelector('.progress-row');
    const progressLabel = document.getElementById('question-progress-label');
    const revealPanel = document.getElementById('gift-reveal');
    let currentStep = 0;

    function renderStep() {
        const step = getVisibleStep(currentStep);
        const panel = document.getElementById('question-panel');
        panel.classList.remove('is-entering');
        void panel.offsetWidth;
        panel.classList.add('is-entering');

        if (step.type === 'reveal') {
            progressRow.hidden = true;
            panel.hidden = true;
            revealPanel.hidden = false;
            revealPanel.querySelector('.reveal-copy').textContent = step.content;
            revealPanel.querySelector('h2').focus();
            return;
        }

        progressRow.hidden = false;
        panel.hidden = false;
        revealPanel.hidden = true;
        prompt.textContent = step.prompt;
        prompt.focus();
        answers.replaceChildren(...step.answers.map((answer) => {
            const button = document.createElement('button');
            button.className = 'gift-button answer-button';
            button.type = 'button';
            button.textContent = answer;
            button.addEventListener('click', () => {
                currentStep += 1;
                renderStep();
            });
            return button;
        }));
        progress.value = currentStep + 1;
        progressLabel.textContent = `Question ${currentStep + 1} of ${questions.length}`;
    }

    passwordForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const submit = passwordForm.querySelector('button[type="submit"]');
        submit.disabled = true;
        passwordError.textContent = '';

        try {
            if (await verifyPassword(passwordInput.value)) {
                gate.hidden = true;
                quiz.hidden = false;
                currentStep = 0;
                renderStep();
            } else {
                passwordError.textContent = 'That password didn’t open the jar. Try again.';
                passwordInput.select();
            }
        } catch {
            passwordError.textContent = 'The password check needs a secure page connection. Open the HTTPS site and try again.';
        } finally {
            submit.disabled = false;
        }
    });
}
