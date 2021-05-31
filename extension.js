const clipboardy = require( "clipboardy" );
const vscode = require( "vscode" );

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const { window, commands, Position } = vscode;
	const useState = vscode.commands.registerCommand('extension.reactUseState', () => {
		const editor = window.activeTextEditor;
		if( !editor ) return window.showErrorMessage( 'Need to using on activeTextEditor' );
		const clipboard = clipboardy.readSync();
		const selectedText = editor.document.getText( editor.selection )
		const isSelect = selectedText.length > 0;

		const _arr = Array.from( isSelect ? selectedText : clipboard );
		_arr.unshift( _arr.shift().toLocaleUpperCase() )
		const result = ['set'].concat( _arr ).join('');

		editor.edit(builder => {
			if( isSelect ) builder.delete(editor.selection)
			builder.insert(editor.selection.start, result)
		})
	});

	context.subscriptions.push( useState );
}


// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
