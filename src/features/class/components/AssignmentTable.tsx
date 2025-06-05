import { AssignmentRow } from '../types/class.type';

interface AssignmentTableProps {
  assignments: AssignmentRow[];
}

export default function AssignmentTable({ assignments }: AssignmentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              문제
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              평균 점수
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assignments.map((assignment) => (
            <tr key={assignment.problemId}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-PRIMARY">{assignment.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{assignment.avgScore}점</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
