/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/

import * as vscode from "vscode";
import { CompletionItemProvider, CompletionItemManager } from "../CompletionItemManager";
import { SyntaxItem, createCompletionItem } from "../../../general/include";

export class TestforBlocksCompletionProvider implements CompletionItemProvider {

    public Defaults : vscode.CompletionItem[];

    constructor() {
        this.Defaults = new Array<vscode.CompletionItem>(
            createCompletionItem("masked", "masked", "", vscode.CompletionItemKind.Keyword),
            createCompletionItem("all", "all", "", vscode.CompletionItemKind.Keyword)
        );
    }

    provideCompletionItems(Item: SyntaxItem, Cm: CompletionItemManager, document: vscode.TextDocument): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        //testforblocks <begin: x y z> <end: x y z> <destination: x y z> [masked|all]

        switch (Item.Count()) {
            case 0: //<begin: x>
            case 1: //<begin: y>
            case 2: //<begin: z>
            case 3: //<end: x>
            case 4: //<end: y>
            case 5: //<end: z>
            case 6: //<destination: x>
            case 7: //<destination: y>
            case 8: //<destination: z>
                return Cm.CoordinateCompletionProvider.provideDiagnostics();

            case 9: //[masked|all]
                return this.Defaults;

            default:
                break;
        }

        return undefined;
    }
}