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
import { DocumentFormattingParams, DocumentRangeFormattingParams } from "vscode-languageserver";
import { TextEdit } from "vscode-languageserver-textdocument";
import { GetDocument } from "../code/include";
import { Languages } from "../Constants";
import { formatLangauge, formatLangaugeRange } from "./Language";
import { formatMcfunction, formatMcfunctionRange } from "./Mcfunction";

export function OnDocumentFormatRequestAsync(params: DocumentFormattingParams): Promise<TextEdit[] | undefined> {
  return new Promise<TextEdit[] | undefined>((resolve, reject) => {
    resolve(OnDocumentFormatRequest(params));
  });
}

export function OnDocumentRangeFormatRequestAsync(params: DocumentRangeFormattingParams): Promise<TextEdit[] | undefined> {
  return new Promise<TextEdit[] | undefined>((resolve, reject) => {
    resolve(OnDocumentRangeFormatRequest(params));
  });
}

function OnDocumentFormatRequest(params: DocumentFormattingParams): TextEdit[] | undefined {
  let doc = GetDocument(params.textDocument.uri);

  switch (doc.languageId) {
    case Languages.McFunctionIdentifier:
      return formatMcfunction(doc, params);

    case Languages.McLanguageIdentifier:
      return formatLangauge(doc, params);

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
      break;
  }

  return undefined;
}

function OnDocumentRangeFormatRequest(params: DocumentRangeFormattingParams): TextEdit[] {
  let doc = GetDocument(params.textDocument.uri);

  switch (doc.languageId) {
    case Languages.McFunctionIdentifier:
      return formatMcfunctionRange(doc, params);

    case Languages.McLanguageIdentifier:
      return formatLangaugeRange(doc, params);

    case Languages.JsonCIdentifier:
    case Languages.JsonIdentifier:
    default:
  }

  return [];
}
