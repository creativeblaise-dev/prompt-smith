import { AnalysisResult } from '@/types/analysis';

interface ScoreDisplayProps {
  result: AnalysisResult;
}

interface CategoryScoreCardProps {
  category: string;
  score: number;
  maxScore: number;
  color: string;
}

function CategoryScoreCard({ category, score, maxScore, color }: CategoryScoreCardProps) {
  const percentage = (score / maxScore) * 100;
  
  return (
    <div className="card">
      <div className="text-sm font-medium text-gray-600 mb-2">{category}</div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl font-bold text-gray-900">{score}</span>
        <span className="text-sm text-gray-500">/ {maxScore}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function getQualityTier(score: number): { tier: string; color: string; bgColor: string } {
  if (score >= 90) return { tier: 'Excellent', color: 'text-green-800', bgColor: 'bg-green-100' };
  if (score >= 75) return { tier: 'Good', color: 'text-blue-800', bgColor: 'bg-blue-100' };
  if (score >= 60) return { tier: 'Fair', color: 'text-yellow-800', bgColor: 'bg-yellow-100' };
  if (score >= 40) return { tier: 'Poor', color: 'text-orange-800', bgColor: 'bg-orange-100' };
  return { tier: 'Critical', color: 'text-red-800', bgColor: 'bg-red-100' };
}

function getCategoryColor(score: number, maxScore: number): string {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 90) return 'bg-green-500';
  if (percentage >= 75) return 'bg-blue-500';
  if (percentage >= 60) return 'bg-yellow-500';
  if (percentage >= 40) return 'bg-orange-500';
  return 'bg-red-500';
}

export function ScoreDisplay({ result }: ScoreDisplayProps) {
  const { tier, color, bgColor } = getQualityTier(result.overallScore);
  
  // Group category scores by category name for easier access
  const categoryScoreMap = result.categoryScores.reduce((acc, score) => {
    acc[score.category] = score;
    return acc;
  }, {} as Record<string, any>);
  
  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="card text-center">
        <div className="text-sm font-medium text-gray-600 mb-2">Overall Quality Score</div>
        <div className="text-6xl font-bold text-gray-900 mb-2">{result.overallScore}</div>
        <div className="text-sm text-gray-500 mb-4">out of {result.maxScore}</div>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color} ${bgColor}`}>
          {tier}
        </div>
      </div>
      
      {/* Category Scores */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {result.categoryScores.map((categoryScore) => (
            <CategoryScoreCard
              key={categoryScore.category}
              category={categoryScore.category}
              score={categoryScore.score}
              maxScore={categoryScore.maxScore}
              color={getCategoryColor(categoryScore.score, categoryScore.maxScore)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
