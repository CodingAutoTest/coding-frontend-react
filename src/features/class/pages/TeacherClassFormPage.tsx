import ClassForm from '../components/ClassForm';
import { ClassSummary } from '../types/class.type';

interface Props {
  defaultValue?: ClassSummary;
}

export default function TeacherClassFormPage({ defaultValue }: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {defaultValue ? '클래스 수정' : '새 클래스 만들기'}
      </h1>
      <div className="max-w-2xl">
        <ClassForm initialData={defaultValue} />
      </div>
    </div>
  );
}
