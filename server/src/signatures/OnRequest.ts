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
import { SignatureHelp, SignatureHelpParams } from "vscode-languageserver";
import { GetDocument } from "../code/include";
import { Languages } from "../Constants";
import { ProvideMcfunctionSignature } from "../types/minecraft/behavior/functions/include";
import { ProvideJsonSignature } from "./Json";
import { ProvideLanguageSignature } from "./Language";

export async function OnSignatureRequestAsync(params: SignatureHelpParams): Promise<SignatureHelp | undefined> {
  return new Promise<SignatureHelp | undefined>((resolve, reject) => {
    resolve(OnSignatureRequest(params));
  });
}

function OnSignatureRequest(params: SignatureHelpParams): SignatureHelp | undefined {
  let pos = params.position;
  let doc = GetDocument(params.textDocument.uri);

  //Switch per language type
  switch (doc.languageId) {
    case Languages.McFunctionIdentifier:
      return ProvideMcfunctionSignature(doc, pos);

    case Languages.McLanguageIdentifier:
      return ProvideLanguageSignature(doc, pos);

    case Languages.McOtherIdentifier:
      return undefined;

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      return ProvideJsonSignature(doc, pos);
    //return Other.ProvideSignature(doc, pos);
  }

  return undefined;
}
