'use client';

import { useState } from 'react';
import { AnalysisResult, Finding } from '@/types/analysis';

interface FindingsListProps {
  result: AnalysisResult;
}

interface FindingCardProps {
  finding: Finding;
}

interface SeverityBadgeProps {
  severity: 'high' | 'medium' | 'low';
}

interface CategoryBadgeProps {
  category: string;
}

interface StatusIconProps {
  passed: boolean;
}

function StatusIcon({ passed }: StatusIconProps) {
  return (
    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
      passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
    }`}>
      {passed ? (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      )}
    </div>
  );
}

function SeverityBadge({ severity }: SeverityBadgeProps) {
  const styles = {
    high: 'badge badge-high',
    medium: 'badge badge-medium',
    low: 'badge badge-low'
  };
  
  return (
    <span className={styles[severity]}>
      {severity.toUpperCase()}
    </span>
  );
}

function CategoryBadge({ category }: CategoryBadgeProps) {
  const categoryMap: Record<string, string> = {
    clarity: 'Clarity',
    context: 'Context',
    instructions: 'Instructions',
    format: 'Format',
    safety: 'Safety'
  };
  
  return (
    <span className="badge bg-gray-100 text-gray-700">
      {categoryMap[category] || category}
    </span>
  );
}

function FindingCard({ finding }: FindingCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="card">
      <div className="flex items-start gap-3">
        <StatusIcon passed={finding.passed} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-medium text-gray-900">{finding.ruleName}</h4>
            <SeverityBadge severity={finding.severity} />
            <CategoryBadge category={finding.category} />
          </div>
          
          <p className="text-sm text-gray-600 mb-2">{finding.message}</p>
          
          {finding.suggestion && (
            <div>
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                aria-expanded={expanded}
              >
                {expanded ? 'Hide' : 'Show'} suggested fix
              </button>
              
              {expanded && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                  {finding.suggestion}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function FindingsList({ result }: FindingsListProps) {
  const [showPassed, setShowPassed] = useState(false);
  
  // Group findings by severity
  const groupedFindings = result.findings.reduce((acc, finding) => {
    if (finding.passed && !showPassed) return acc;
    
    const severity = finding.passed ? 'passed' : finding.severity;
    if (!acc[severity]) acc[severity] = [];
    acc[severity].push(finding);
    return acc;
  }, {} as Record<string, Finding[]>);
  
  const severityOrder = ['high', 'medium', 'low', 'passed'];
  const severityLabels = {
    high: 'High Priority Issues',
    medium: 'Medium Priority Issues', 
    low: 'Low Priority Issues',
    passed: 'Passed Rules'
  };
  
  const failedCount = result.findings.filter(f => !f.passed).length;
  const passedCount = result.findings.filter(f => f.passed).length;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Analysis Results ({failedCount} issues, {passedCount} passed)
        </h3>
        <button
          onClick={() => setShowPassed(!showPassed)}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          {showPassed ? 'Hide' : 'Show'} passed rules
        </button>
      </div>
      
      {severityOrder.map(severity => {
        const findings = groupedFindings[severity];
        if (!findings || findings.length === 0) return null;
        
        return (
          <div key={severity}>
            <h4 className="font-medium text-gray-900 mb-3">
              {severityLabels[severity as keyof typeof severityLabels]} ({findings.length})
            </h4>
            <div className="space-y-3">
              {findings.map((finding, index) => (
                <FindingCard key={`${finding.ruleId}-${index}`} finding={finding} />
              ))}
            </div>
          </div>
        );
      })}
      
      {Object.keys(groupedFindings).length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {showPassed ? 'No findings to display' : 'No issues found! All rules passed.'}
        </div>
      )}
    </div>
  );
}
