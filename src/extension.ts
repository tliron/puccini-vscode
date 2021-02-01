/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { workspace, languages, ExtensionContext, TextDocument } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient/node';

export function activate(context: ExtensionContext) {
	//console.log('TOSCA');

	createClient();

	checkAllDocuments();

	// See: https://github.com/redhat-developer/vscode-yaml
	// See: https://github.com/davidhewitt/shebang-language-associator/blob/master/src/extension.ts

	let disposable = workspace.onDidOpenTextDocument(checkDocument);
	context.subscriptions.push(disposable);

	disposable = workspace.onDidSaveTextDocument(checkDocument);
	context.subscriptions.push(disposable);
}

export function deactivate(): Thenable<void> | undefined {
	if (client) {
		return client.stop();
	} else {
		return undefined;
	}
}

//
// Detect TOSCA documents
//

function checkAllDocuments() {
	for (const textDocument of workspace.textDocuments) {
		checkDocument(textDocument);
	}
}

function checkDocument(textDocument: TextDocument) {
	// Any YAML file that contains a line starting with "tosca_definitions_version: "
	if (textDocument.fileName.match(/.yaml$/) && textDocument.getText().match(/^tosca_definitions_version: /m)) {
		languages.setTextDocumentLanguage(textDocument, 'tosca');
	}
}

//
// Client for TOSCA Language Server
//

let client: LanguageClient;

function createClient() {
	let serverOptions: ServerOptions = {
		command: '/home/emblemparade/go/bin/puccini-language-server',
		args: ['-vv', '--log', '/tmp/p.log'],
		/*args: ['-vv'],
		// Logging to stderr isn't working
		options: <ExecutableOptions>{stdio: ['pipe', 'pipe', 'pipe']}*/
		/*args: ['--protocol', 'nodejs', '-vv', '--log', '/tmp/p.log'],
		// "options" will be merged into child_process.spawn's options
		// See: https://github.com/microsoft/vscode-languageserver-node/blob/master/client/src/node/main.ts#L422
		options: <ExecutableOptions>{stdio: [null, null, null, 'ipc']}*/
	};

	// Options to control the language client
	let clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'tosca' }]
		//synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
		//	fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		//}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'tosca',
		'TOSCA Language Server',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
}