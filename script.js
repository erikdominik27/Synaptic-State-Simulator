$(document).ready(function() {

    function fireNeuron(color) {
        let burst = $('<div class="neuron-fire firing"></div>');
  
        let topPos = Math.floor(Math.random() * 25) + 15; 
        let leftPos = Math.floor(Math.random() * 30) + 35; 
        
        burst.css({
            'top': topPos + '%',
            'left': leftPos + '%',
            'background-color': color,
            'box-shadow': '0 0 15px ' + color + ', 0 0 25px ' + color
        });

        $('#synapse-field').append(burst);
        setTimeout(() => { burst.remove(); }, 800);
    }

    $('#run-btn').click(function() {
        let userName = $('#user-name').val();
        let selectedColor = $('#chem-color').val();
        let substance = $('input[name="substance"]:checked').val();

        if (userName === "") {
            $('#user-name').addClass('error-border'); 
            alert("Subject ID required for simulation.");
        } else {
            $('#user-name').removeClass('error-border');

          
            $('body').css({'transition': 'background 0.5s', 'background-color': selectedColor});
            setTimeout(() => { $('body').css('background-color', '#0b0e14'); }, 1000);

          
            let titleText = "";
            let prosText = "";
            let consText = "";
            let burstIntensity = 0;
            let burstColor = "#ffffff";

          
            switch(substance) {
                case "caffeine":
                    titleText = "Caffeine (Energy Boost)";
                    prosText = "Increased alertness, improved reaction time, and better focus.";
                    consText = "Potential restlessness, jitters, and sleep disruption.";
                    burstIntensity = 35; 
                    burstColor = "#ffea00"; 
                    break;
                case "alcohol":
                    titleText = "Alcohol (Brain Slower)";
                    prosText = "Short-term relaxation and reduced social anxiety.";
                    consText = "Slowed thinking, impaired movement, and poor judgment.";
                    burstIntensity = 8; 
                    burstColor = "#00ff88"; 
                    break;
                case "nicotine":
                    titleText = "Nicotine (Quick Stimulant)";
                    prosText = "Brief surge in concentration and mild mood lift.";
                    consText = "Highly addictive; strains the heart and restricts blood flow.";
                    burstIntensity = 50; 
                    burstColor = "#ff0000"; 
                    break;
                case "dopamine_agonist":
                    titleText = "L-Dopa (Reward Signal)";
                    prosText = "Enhanced motivation and better physical coordination.";
                    consText = "Possible nausea and increased impulsive or risky behavior.";
                    burstIntensity = 65;
                    burstColor = "#ff00ff"; 
                    break;
                case "serotonin_boost":
                    titleText = "SSRI (Mood Balancer)";
                    prosText = "Stabilized emotions and lower anxiety levels over time.";
                    consText = "Initial drowsiness or minor stomach discomfort.";
                    burstIntensity = 15;
                    burstColor = "#00ccff"; 
                    break;
                default:
                    titleText = "Standard State";
                    prosText = "Brain functioning at baseline homeostasis.";
                    consText = "No substance-induced changes detected.";
                    burstIntensity = 20;
                    burstColor = "#ffffff";
            }

            $('#con-zone, #pro-zone').css('opacity', '0').empty();
            
            setTimeout(() => {
               
                $('#con-zone').append(`
                    <strong style="color: #ff4444; text-transform: uppercase; letter-spacing: 1px;">DOWN SIDE</strong>
                    <p style="margin-top: 10px;">${consText}</p>
                `).css('opacity', '1');

          
                $('#pro-zone').append(`
                    <strong style="color: #00ff88; text-transform: uppercase; letter-spacing: 1px;">UP SIDE</strong>
                    <p style="margin-top: 10px;">${prosText}</p>
                `).css('opacity', '1');
            }, 300);

           
            $('.status-msg').remove(); 
            $('#controls').append(`
                <div class="status-msg" style="border-top: 2px solid ${burstColor}; margin-top: 20px; padding-top: 15px; text-align: center;">
                    <h4 style="color: ${burstColor}; text-transform: uppercase;">${titleText}</h4>
                    <span style="font-size: 0.75rem; color: #888;">Analyzing Subject: ${userName}</span>
                </div>
            `);

          
            for(let i = 0; i < burstIntensity; i++) {
                setTimeout(function() {
                    fireNeuron(burstColor);
                }, i * 60); 
            }
        }
    });

    $('#save-btn').click(function() {
        let subID = $('#subject-id').val();
        let noteText = $('#notes').val();
        let effects = [];
        $('.effect-check:checked').each(function() { effects.push($(this).val()); });

        if (subID === "" || noteText === "") {
            alert("Ensure Subject ID and Observations are filled.");
            $('#subject-id, #notes').addClass('error-border');
        } else {
            $('#subject-id, #notes').removeClass('error-border');

            let logEntry = $(`
                <div class="log-entry" style="background: rgba(77, 184, 255, 0.05); border-left: 4px solid #4db8ff; padding: 15px; margin-bottom: 10px; border-radius: 2px;">
                    <strong style="color: #4db8ff; font-family: 'Segoe UI', sans-serif;">SESSION: ${subID}</strong>
                    <p style="margin: 8px 0; font-size: 0.9rem; color: #ccc;">${noteText}</p>
                    <div style="font-size: 0.75rem; color: #00ff88; text-transform: uppercase; letter-spacing: 1px;">
                        Symptoms: ${effects.length > 0 ? effects.join(' | ') : 'Clear'}
                    </div>
                </div>
            `);

            $('#log-results').prepend(logEntry);
            
            
            $('#subject-id, #notes').val('');
            $('.effect-check').prop('checked', false);
        }
    });
});