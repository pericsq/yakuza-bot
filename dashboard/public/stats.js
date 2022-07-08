function fetchData() {

    fetch('https://api.statcord.com/v3/884467910494535741').then(response => {
        return response.json();
    }).then(data => {
        console.log(data.data[0].servers);
        document.querySelector('#server-count').innerHTML = `+20 servers`
        console.log(data.data[0].users);
        document.querySelector('#user-count').innerHTML = `+1.5k users`
        console.log(data.data[0].users);
        document.querySelector('#cmd-count').innerHTML = `+1354`
        // console.log(data.popular);
        // if (data.popular[0].name === "help") {
        // 	return document.querySelector('#most-pop-cmd').innerHTML = `<h4>Most Used Command</h4><br /><p>e!${data.popular[1].name}</p>`
        // } else {
        // 	return document.querySelector('#most-pop-cmd').innerHTML = `<h4>Most Used Command</h4><br /><p>e!${data.popular[0].name}</p>`
        // }
    }).catch(error => {
        console.log(error);
    });
}

fetchData();