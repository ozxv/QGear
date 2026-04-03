import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function GaragePage() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">صفحة الكراج</h1>
        <p className="text-gray-400 mb-2">رقم الكراج: {id}</p>

        <div className="grid gap-6 md:grid-cols-2 mt-8">
          <div className="bg-[#111] rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-3">الخدمات</h2>
            <ul className="space-y-2 text-gray-300">
              <li>تغيير زيت</li>
              <li>فحص شامل</li>
              <li>كهرباء سيارات</li>
              <li>برمجة</li>
            </ul>
          </div>

          <div className="bg-[#111] rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-3">المنتجات</h2>
            <ul className="space-y-2 text-gray-300">
              <li>بطارية</li>
              <li>فلتر زيت</li>
              <li>بواجي</li>
              <li>فحمات</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}