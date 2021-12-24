// Check if the user scroll
window.onscroll = () => {
    console.log(document.documentElement.scrollTo);

    let photo = document.body.querySelector('.photo-section');
    let image = document.body.querySelectorAll('.image-animation');

    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        photo.classList.remove('zoom-out');
    } else {
        photo.classList.add('zoom-out');
    }

    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300){
        image.forEach(x => x.classList.add('zoom-out'));
    } else {
        image.forEach(x => x.classList.remove('zoom-out'));
    }

}
