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
import { readdirSync, statSync } from "fs";
import { WorkspaceFolder } from "vscode-languageserver";
import { URI } from "vscode-uri";
import { Manager } from "../manager/Manager";

export function GetFilename(filepath: string): string {
  filepath = filepath.replace(/\\/g, "//");
  let index = filepath.lastIndexOf("/");

  if (index > -1) {
    filepath = filepath.substring(index + 1, filepath.length);
  }

  index = filepath.lastIndexOf(".");

  if (index > -1) {
    filepath = filepath.substring(0, index);
  }

  return filepath.trim();
}

export function getExtension(filepath: string): string {
  let index = filepath.lastIndexOf(".");

  if (index < 0) return "";

  return filepath.substring(index, filepath.length).trim();
}

export function GetProjectFiles(): Promise<string[]> {
  let workspaces = Manager.Connection.workspace.getWorkspaceFolders();

  return workspaces.then(
    (x) => new Promise<string[]>((resolve, reject) => resolve(CollectFiles(x)))
  );
}

export function GetParent(uri: string): string {
  let Index = uri.lastIndexOf("\\");

  if (Index > -1) {
    return uri.slice(0, Index + 1);
  }

  Index = uri.lastIndexOf("/");

  if (Index > -1) {
    return uri.slice(0, Index + 1);
  }

  return uri;
}

function CollectFiles(folders: WorkspaceFolder[] | null): string[] {
  let files: string[] = [];
  let dirs: string[] = [];

  if (folders == null) return files;

  for (let I = 0; I < folders.length; I++) {
    let Path = URI.parse(folders[I].uri).fsPath;
    dirs.push(Path);
  }

  for (let I = 0; I < dirs.length; I++) {
    let dir = dirs[I];

    if (!dir.endsWith("\\")) dir += "\\";

    let Out = readdirSync(dir);

    for (let J = 0; J < Out.length; J++) {
      let Item = dir + Out[J];

      if (statSync(Item).isDirectory()) {
        if (!Item.includes(".git")) {
          dirs.push(Item);
        }
      } else {
        files.push(Item);
      }
    }
  }

  return files;
}
