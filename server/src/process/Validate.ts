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
import { Diagnostic, DiagnosticSeverity } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { Manager } from "../manager/include";
import { EmptyTypes } from "../types/general/Empty";

export function ValidateBehaviourFolder(doc: TextDocument): void {
  const SubFolder = GetSubFolder(doc.uri);

  if (!SubFolder) return;

  switch (SubFolder.toLowerCase()) {
    case "animation_controllers":
    case "animations":
    case "blocks":
    case "biomes":
    case "documentation":
    case "entities":
    case "feature_rules":
    case "functions":
    case "loot_tables":
    case "items":
    case "recipes":
    case "scripts":
    case "spawn_rules":
    case "structures":
    case "trading":
    case "texts":
      return;

    default:
      IllegalFolder(doc, SubFolder);
  }
}

export function ValidateResourceFolder(doc: TextDocument): void {
  const SubFolder = GetSubFolder(doc.uri);

  if (!SubFolder) return;

  switch (SubFolder.toLowerCase()) {
    case "animation_controllers":
    case "animations":
    case "attachables":
    case "blocks":
    case "entity":
    case "fogs":
    case "font":
    case "items":
    case "materials":
    case "models":
    case "particles":
    case "render_controllers":
    case "sounds":
    case "texts":
    case "textures":
    case "ui":
      return;

    default:
      IllegalFolder(doc, SubFolder);
  }
}

function GetSubFolder(uri: string): string | undefined {
  let match = uri.match(/((rp|bp|RP|BP)\\|(behavior_packs|resource_packs)\\[^\\]+\\)/);

  if (match) {
    let index = 0;
    if (match.index) {
      index = match.index;
    }
    const StartIndex = index + match[0].length;
    const EndIndex = uri.indexOf("\\", StartIndex);

    if (EndIndex < 0) return undefined;
    const element = uri.substring(StartIndex, EndIndex);
    return element;
  }

  return undefined;
}

function IllegalFolder(doc: TextDocument, SubFolder: string): void {
  let receiver: Diagnostic[] = [
    {
      message: `Illegal folder found in behaviour pack: "${SubFolder}"`,
      range: EmptyTypes.EmptyRange(),
      severity: DiagnosticSeverity.Error,
    },
  ];

  Manager.Diagnostic.SendDiagnostics(doc, receiver);
}
