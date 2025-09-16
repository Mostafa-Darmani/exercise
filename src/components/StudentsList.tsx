import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface Student {
  id: number;
  name: string;
}

interface ClassType {
  id?: number;
  name?: string;
  students: Student[];
}

const students: ClassType[] = [
  {
    id: 1,
    name: "کلاس هفتم ب",
    students: [
      { id: 1, name: "محمدامین رضایی" },
      { id: 2, name: "مسعود فرحی" },
      { id: 3, name: "علی علاءالدین حسینی شیرازی" },
      { id: 4, name: "محمد روشنگرا" },
    ],
  },
  {
    id: 2,
    name: "کلاس هفتم الف",
    students: [
      { id: 5, name: "رضا کارمحمدی" },
      { id: 6, name: "علی امینی بداغ‌آبادی" },
      { id: 7, name: "محمد یاسر ایحدی" },
      { id: 8, name: "نجمالدین شریعتی" },
    ],
  },
  // بقیه کلاس‌ها...
];

const StudentsList = () => {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  useEffect(() => {
    const savedNames = JSON.parse(
      localStorage.getItem("selectedStudents") || "[]"
    );
    setSelectedNames(savedNames);
  }, []);
    const navigate = useNavigate();

const handleClose = () => {
    localStorage.removeItem("selectedStudents"); // یا localStorage.clear() برای پاک کردن کل استوریج
    navigate("/"); // برگشت به home
  };
  return (
    <div className="w-[400px] bg-[#F9FBFF] min-h-screen flex flex-col gap-7 pb-7">
  <div>
    <div className="flex items-center justify-center mb-2">
        <div className="h-[2px] w-[70px] bg-gray-200 rounded-2xl mt-10">
        </div>
    </div>

      <div className="flex justify-between items-center border-b border-gray-300 mx-7 " >     
        <div className="flex items-center gap-1 mb-3">
          <span className="text-blue-500">{selectedNames.length}</span>
          <span>نفر انتخاب شده</span>
        </div>
        <input
                type="checkbox"
                checked={true}
                readOnly
                className="
                  w-5 h-5 
                  cursor-pointer
                  appearance-none
                  border border-gray-400
                  rounded-lg
                  checked:bg-black
                  relative
                  before:content-['✔']
                  before:absolute
                  before:text-white
                  before:border-black
                  before:top-1/2
                  before:left-1/2
                  before:-translate-x-1/2
                  before:-translate-y-1/2
                  before:text-xs
                  before:opacity-0
                  checked:before:opacity-100
                "
              />
      </div>
    </div>

      {students.map((cls) =>
        cls.students.map((stu) => {
          const isSelected = selectedNames.includes(stu.name); // بررسی لوکال استوریج
          return (
            <div
              key={stu.id}
              className="rounded-lg p-2 flex justify-between mx-6"
            >
              <span className={isSelected ? "text-gray-400" : "text-black"}>
                {stu.name}
              </span>
              <input
                type="checkbox"
                checked={!isSelected}
                readOnly
                className="
                  w-5 h-5 
                  cursor-pointer
                  appearance-none
                  border border-gray-400
                  rounded-lg
                  checked:bg-white
                  relative
                  before:content-['✔']
                  before:absolute
                  before:text-black
                  before:border-black
                  before:top-1/2
                  before:left-1/2
                  before:-translate-x-1/2
                  before:-translate-y-1/2
                  before:text-xs
                  before:opacity-0
                  checked:before:opacity-100
                "
              />
            </div>
          );
        })
      )}
      <div className="fixed bottom-5 -left-43 w-[460px] ">
        <button
          onClick={handleClose}
          className="p-5 bg-[#0B0A141B] text-black rounded-2xl font-light"
        >
           بستن صفحه
        </button>
      </div>
    </div>
  );
};

export default StudentsList;
