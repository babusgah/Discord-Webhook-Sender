document.getElementById('webhookForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const webhookURL = document.getElementById('webhookURL').value;
  const message = document.getElementById('message').value;

  // Create a payload
  const payload = {
    content: message
  };

  // Send the webhook request
  fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to send the message. HTTP status ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log('Webhook message sent:', data);
      alert('Webhook message sent successfully!');
    })
    .catch(error => {
      console.error('There was a problem sending the webhook message:', error.message);
      alert('Failed to send webhook message. Check console for details.');
    });
});

// Delete Webhook button functionality
document.getElementById('deleteWebhookBtn').addEventListener('click', function(event) {
  event.preventDefault();

  const webhookURL = document.getElementById('webhookURL').value;

  if (confirm('Are you sure you want to delete the webhook?')) {
    fetch(webhookURL, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete the webhook. HTTP status ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log('Webhook deleted:', data);
        alert('Webhook deleted successfully!');
      })
      .catch(error => {
        console.error('There was a problem deleting the webhook:', error.message);
        alert('Failed to delete the webhook. Check console for details.');
      });
  }
});