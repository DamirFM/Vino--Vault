const newFormHandler = async (event) => {
  event.preventDefault();

  const comment_body = document.querySelector('#text-comment').value.trim();
  const wine_id = event.target.getAttribute('data-id')
  console.log(comment_body)
  console.log(wine_id)


  if (comment_body && wine_id) {
   
    const response = await fetch(`/api/review`, {
      method: 'POST',
      body: JSON.stringify({ comment_body, wine_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // stay on the same page
      document.location.reload();
    } else {
      alert('Failed to create review');
    }
  }
};


const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/review/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};



document
  .querySelector('#btn-comment')
  // click for button
  .addEventListener('click', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);

