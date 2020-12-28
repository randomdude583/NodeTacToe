const move = async (position) => {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            const response = JSON.parse(xmlHttp.responseText);

            for (i = 0; i < response.board.length; i++) {
                const value = response.board[i];
                document.getElementById(`box${i + 1}`).innerHTML = `${value}`;
                if(value == "X" || value == "O"){
                    document.getElementById(`box${i + 1}`).setAttribute('disabled','disabled');
                }
            }
        
            if (response.winner) {
                if(response.winner == "STALEMATE"){
                    document.getElementById('message').innerHTML = `${response.winner}!`;
                } else {
                    document.getElementById('message').innerHTML = `${response.winner} wins!`;
                }
            } else {
                document.getElementById('message').innerHTML = `${response.turn}'s turn`;
            }
        }
    }
    xmlHttp.open("POST", `http://localhost:3000/move/${position}`, true); // true for asynchronous 
    xmlHttp.send(null);
};




const reset = async () => {
    var xmlHttpReset = new XMLHttpRequest();
    xmlHttpReset.onreadystatechange = function () {
        if (xmlHttpReset.readyState == 4 && xmlHttpReset.status == 200){
            const response = JSON.parse(xmlHttpReset.responseText);

            for (i = 0; i < response.board.length; i++) {
                const value = response.board[i];
                document.getElementById(`box${i + 1}`).innerHTML = `${value}`;
                document.getElementById(`box${i + 1}`).removeAttribute('disabled');
            }

            document.getElementById('message').innerHTML = `${response.turn}'s turn`;
        }
    }
    xmlHttpReset.open("POST", `http://localhost:3000/reset`, true); // true for asynchronous 
    xmlHttpReset.send(null);
};

