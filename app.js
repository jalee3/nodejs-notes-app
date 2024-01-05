const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.version('1.0.1')

//Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            alias: "t",
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            alias: 'b',
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//Create remove command

yargs.command({
    command: 'remove',
    describe: "Remove a note",
    builder: {
        title: {
            alias: "t",
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
})

yargs.command({
    command: 'list',
    describe: 'List notes',
    handler() {
        notes.listNotes();
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            alias: "t",
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
})

yargs.parse()