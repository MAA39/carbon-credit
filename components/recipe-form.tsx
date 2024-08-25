"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Start of Selection
// モックデータの作成
const mockData = {
  message: `こんにちは！森林の二酸化炭素吸収量を計算するお手伝いをさせていただきます。以下の情報を順番に教えてください。

1. 森林の種類（例：ヒノキ、スギ、マツなど）：
2. 森林の面積（ヘクタール単位）：
3. 森林の樹齢（年）：
4. 間伐を行ったかどうか（はい/いいえ）：

上記の情報をいただいたら、以下の計算を行います：

- 幹の成長量（m3/ha）を樹種と樹齢から推定
- 拡大係数、容積密度、炭素含有量を樹種に応じて設定
- 森林吸収量(CO2-t) = 森林面積 × 幹の成長量 × 拡大係数 × 容積密度 × 炭素含有量 × (44/12)

計算結果と共に、二酸化炭素吸収量が地球温暖化対策にどのように貢献するかについての簡単な説明も提供いたします。`,
};

export function RecipeForm({
  children,
  onSubmit,
  submitButtonText = "送信",
  secondaryButtonText = "プロンプトを試す",
  onSecondaryClick,
}: {
  children?: React.ReactNode;
  onSubmit: () => void;
  submitButtonText?: string;
  secondaryButtonText?: string;
  onSecondaryClick: () => void;
}) {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">目的</h2>
            <Textarea
              placeholder="レシピの目的を入力してください"
              className="min-h-[100px]"
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">入力データ</h2>
            <Textarea
              placeholder="必要な入力データの説明を入力してください"
              className="min-h-[100px]"
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">期待される出力</h2>
            <Textarea
              placeholder="期待される出力の説明を入力してください"
              className="min-h-[100px]"
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Excel/CSVデータ</h2>
            <Textarea
              placeholder="ここにExcel/CSVデータを貼り付けてください"
              className="min-h-[100px]"
            />
          </div>

          <Button className="w-full" onClick={onSubmit}>
            {submitButtonText}
          </Button>
        </div>

        <div className="flex flex-col space-y-6 h-full">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex-grow flex flex-col">
            <h2 className="text-lg font-semibold mb-2">実行結果</h2>
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50 flex-grow overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="min-h-full">
                {children || "まだ結果はありません。"}
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={onSecondaryClick}>
            {secondaryButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function NewRecipeForm() {
  const router = useRouter();
  const [result, setResult] = useState<string | null>(null); // 結果を保存するステートを追加

  const handleSubmit = () => {
    setResult(mockData.message); // モックデータを表示
  };

  return (
    <RecipeForm
      onSubmit={handleSubmit}
      onSecondaryClick={() => router.push("/dashboard/1/")}>
      {result} {/* 結果を表示 */}
    </RecipeForm>
  );
}

export function EditRecipeForm({
  initialData,
  recipeId,
}: {
  initialData: any;
  recipeId: number;
}) {
  const router = useRouter();
  const [result, setResult] = useState<string | null>(mockData.message); // 結果を保存するステートを追加

  const handleSubmit = () => {
    setResult(mockData.message); // モックデータを表示
  };

  return (
    <RecipeForm
      onSubmit={handleSubmit}
      submitButtonText="更新"
      secondaryButtonText="このプロンプトを試す"
      onSecondaryClick={() => router.push(`/dashboard/${recipeId}/`)}>
      {result || (initialData && <div>{JSON.stringify(initialData)}</div>)}{" "}
      {/* 初期データや結果を表示 */}
    </RecipeForm>
  );
}
