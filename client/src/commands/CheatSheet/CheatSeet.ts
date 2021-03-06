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
import { commands, ExtensionContext, Uri, ViewColumn, window } from "vscode";
import * as path from "path";
import { readFileSync } from "fs";
import { Commands } from "../../Constants";

export function Activate(context: ExtensionContext): void {
  console.log("registering cheat sheets");

  context.subscriptions.push(
    commands.registerCommand(Commands.CheatSheet.Molang, (args) =>
      createView(context, "Molang cheat sheet", "documentation/cheat-sheet/Molang.html")
    ),
    commands.registerCommand(Commands.CheatSheet.BehaviorFilters, (args) =>
      createView(context, "Molang cheat sheet", "documentation/cheat-sheet/Behavior filters.html")
    )
  );
}

function createView(context: ExtensionContext, title: string, uri: string): void {
  const panel = window.createWebviewPanel("cheat-sheet", title, ViewColumn.One, {});
  const Path = Uri.file(path.join(context.extensionPath, uri));

  const Data = readFileSync(Path.fsPath, "utf-8");
  panel.webview.html = Data;
}
