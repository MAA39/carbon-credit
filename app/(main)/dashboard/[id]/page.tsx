"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const forestPrompt = `こんにちは！森林の二酸化炭素吸収量を計算するお手伝いをさせていただきます。以下の情報を順番に教えてください。

1. 森林の種類（例：ヒノキ、スギ、マツなど）：
2. 森林の面積（ヘクタール単位）：
3. 森林の樹齢（年）：
4. 間伐を行ったかどうか（はい/いいえ）：

上記の情報をいただいたら、以下の計算を行います：

- 幹の成長量（m3/ha）を樹種と樹齢から推定
- 拡大係数、容積密度、炭素含有量を樹種に応じて設定
- 森林吸収量(CO2-t) = 森林面積 × 幹の成長量 × 拡大係数 × 容積密度 × 炭素含有量 × (44/12)

計算結果と共に、二酸化炭素吸収量が地球温暖化対策にどのように貢献するかについての簡単な説明も提供いたします。`;

//Todo：後ほど実装進める
export default function PromptCreation({ params }: { params: { id: string } }) {
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [testInput, setTestInput] = useState("");
  const [testOutput, setTestOutput] = useState("");
  const router = useRouter();

  useEffect(() => {
    setGeneratedPrompt(forestPrompt);
  }, []);

  const handlePromptEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGeneratedPrompt(e.target.value);
  };

  const handleTestSubmit = async () => {
    setTestOutput(`
ありがとうございます。ご提供いただいた情報を基に、ヒノキ林の二酸化炭素吸収量とカーボンクレジットの金額を計算いたします。

計算結果:
1. 幹の成長量（推定）: 7.5 m³/ha/年 （30年生ヒノキの平均的な成長量）
2. 拡大係数: 1.57 （ヒノキの標準値）
3. 容積密度: 0.407 t/m³ （ヒノキの平均密度）
4. 炭素含有率: 0.5 （木材の一般的な炭素含有率）
5. CO2換算係数: 44/12 （炭素からCO2への変換）

年間CO2吸収量 = 100 ha × 7.5 m³/ha/年 × 1.57 × 0.407 t/m³ × 0.5 × (44/12)
            ≈ 892.84 t-CO2/年

30年間の総CO2吸収量 = 892.84 × 30 ≈ 26,785.2 t-CO2

カーボンクレジットの金額:
カーボンクレジットの価格は市場によって変動しますが、現在の平均的な価格を1トンあたり3,000円と仮定します。

30年間のカーボンクレジット価値 = 26,785.2 t-CO2 × 3,000円/t-CO2
                           ≈ 80,355,600円

説明:
1. CO2吸収量について:
   このヒノキ林は、30年間で約26,785トンのCO2を吸収しました。これは、約5,800台の乗用車が1年間に排出するCO2量に相当します。森林がCO2を吸収し、大気中のCO2濃度を下げることで、地球温暖化の緩和に大きく貢献しています。

2. 間伐の効果:
   間伐を行ったことで、残った木々の成長が促進され、CO2吸収量が増加しています。これにより、森林の健全性が保たれ、長期的な炭素固定能力が向上しています。

3. カーボンクレジットの意義:
   このヒノキ林によるCO2吸収は、約8,035万円相当のカーボンクレジットを生み出しました。これは、企業や個人が自らのCO2排出を相殺するために購入できる環境価値です。カーボンクレジットの売買は、森林保全への経済的インセンティブを提供し、さらなる温室効果ガス削減活動を促進します。

4. 継続的な森林管理の重要性:
   今後も適切な森林管理を続けることで、このヒノキ林は引き続きCO2を吸収し、気候変動対策に貢献し続けます。また、木材として利用される際にも、炭素を長期間固定し続けることができます。

この計算結果は、あなたの森林が気候変動対策に大きく貢献していることを示しています。森林の保全と持続可能な管理は、地球温暖化対策の重要な一環であり、生物多様性の保護にも役立ちます。`);
  };

  const handleBackToEdit = () => {
    console.log("編集に戻る");
    const id = params.id; // 受け取ったIDを使用
    try {
      router.push(`/dashboard/${id}/edit`);
    } catch (error) {
      console.error("ルーティングエラー:", error);
    }
  };

  const handleExecutePrompt = () => {
    console.log("プロンプトを実行");
    handleTestSubmit();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">プロンプト作成と検証</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <label
              htmlFor="generatedPrompt"
              className="block text-lg font-semibold mb-2">
              生成されたプロンプト
            </label>
            <Textarea
              id="generatedPrompt"
              value={generatedPrompt}
              onChange={handlePromptEdit}
              className="w-full min-h-[200px]"
            />
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <label
              htmlFor="testInput"
              className="block text-lg font-semibold mb-2">
              データ入力
            </label>
            <Textarea
              id="testInput"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="データを入力してください"
              className="w-full min-h-[100px]"
            />
          </div>
          <div className="flex justify-between gap-4">
            <Button
              onClick={handleBackToEdit}
              variant="outline"
              className="w-1/2">
              編集に戻る
            </Button>
            <Button onClick={handleExecutePrompt} className="w-1/2">
              プロンプトを実行
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex-grow flex flex-col">
            <h2 className="text-lg font-semibold mb-2">実行結果</h2>
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50 flex-grow overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="min-h-full">
                {testOutput ? (
                  <pre className="whitespace-pre-wrap">{testOutput}</pre>
                ) : (
                  "まだ結果はありません。"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
