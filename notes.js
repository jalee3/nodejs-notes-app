const fs = require('fs');
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);
        console.log(chalk.green.inverse("New note added"));
    }
    else {
        console.log(chalk.red.inverse("Note title already taken"))
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        return JSON.parse(dataBuffer.toString());
    } catch (e) {
        return [];
    }
}

const removeNote = (title) => {
    const notes = loadNotes();

    const newNotes = notes.filter((note) => note.title !== title )

    saveNotes(newNotes);

    if (newNotes.length === notes.length) {
        console.log(chalk.red.inverse("No note found"))
    } else {
        console.log(chalk.green.inverse("Note removed"))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse("Your notes"))
    notes.forEach(note => console.log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes()

    const foundNote = notes.find( note => note.title === title)
    if (foundNote){
        console.log(chalk.bold.underline(foundNote.title))
        console.log(foundNote.body)
    } else {
        console.log(chalk.red.inverse("No note found"))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}