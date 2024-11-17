document.getElementById('uploadButton').addEventListener('click', async function() {
    const files = document.getElementById('fileInput').files;
    const username = document.getElementById('username').value;
    
    if (!username) {
        alert("Te rog să introduci un nume!");
        return;
    }
    
    if (files.length === 0) {
        alert("Te rog să selectezi fișiere!");
        return;
    }

    console.log('Fișiere selectate:', files);
    console.log('Numele utilizatorului:', username);

    // Crearea unui formular FormData pentru a trimite fișierele și numele utilizatorului
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
    }
    formData.append('username', username);

    // Trimiterea fișierelor către backend
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        console.log('Răspunsul serverului:', response);

        if (response.ok) {
            const result = await response.text();
            alert(result);
        } else {
            alert("A apărut o eroare la încărcarea fișierelor.");
        }
    } catch (error) {
        console.error("Eroare:", error);
        alert("A apărut o eroare la conectarea la server.");
    }
});
