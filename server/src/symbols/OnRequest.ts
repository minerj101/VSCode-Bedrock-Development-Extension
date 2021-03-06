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
import { GetFilename } from "../code/include";
import { DocumentSymbolParams, SymbolInformation, SymbolKind, Location, Range, WorkspaceSymbolParams } from "vscode-languageserver";
import { UniformUrl } from "../code/Url";
import { ConvertAllFile, ConvertQueried } from "./Conversion";

/**
 * The request to provide document symbols, asynchorious
 *
 * @param params The parameter that specify which symbols to provide
 */
export async function OnDocumentSymbolRequestAsync(params: DocumentSymbolParams): Promise<SymbolInformation[] | undefined> {
  return new Promise<SymbolInformation[] | undefined>((resolve, reject) => {
    resolve(OnDocumentSymbolRequest(params));
  });
}

/**
 * The request to provide workspace symbols, asynchorious
 *
 * @param params The parameter that specify which symbols to provide
 */
export async function OnWorkspaceSymbolRequestAsync(params: WorkspaceSymbolParams): Promise<SymbolInformation[]> {
  return new Promise<SymbolInformation[]>((resolve, reject) => {
    resolve(OnWorkspaceSymbolRequest(params));
  });
}

/**
 * The request to provide document symbols
 *
 * @param params The parameter that specify which symbols to provide
 */
function OnDocumentSymbolRequest(params: DocumentSymbolParams): SymbolInformation[] | undefined {
  //TODO language and other files included
  let uri = params.textDocument.uri;
  uri = UniformUrl(uri);

  if (uri.endsWith(".json")) return undefined;

  let Out: SymbolInformation[] = [];

  Out.push({
    kind: SymbolKind.Class,
    location: Location.create(uri, Range.create(0, 0, 0, 0)),
    name: GetFilename(uri),
  });

  ConvertAllFile(uri, Out);

  return Out;
}

/**
 * The request to provide workspace symbols
 *
 * @param params The parameter that specify which symbols to provide
 */
function OnWorkspaceSymbolRequest(params: WorkspaceSymbolParams): SymbolInformation[] {
  let Query = params.query;
  let Out: SymbolInformation[] = [];

  ConvertQueried("", Out, Query);

  return Out;
}
