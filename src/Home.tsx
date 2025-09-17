import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {  ChevronLeft } from "lucide-react";
import ArrowIcon from "./assets/ArrowIcon";
import BigFilter from "./assets/BigFilter";
import FilterIcon from "./assets/FilterIcon";
import Candle from "./assets/candle"
import ForwardIcon from "./assets/forwardIcon";
import LineArrowRight from "./assets/LineArrowRight"
import { useNavigate } from "react-router-dom";
import UserIcon from "./assets/UserIcon";
import ArrowRight from "./assets/ArrowRight";
import Search from "./assets/Search"
import VectorPath from "./assets/VectorPath";


interface Student {
  id: number;
  name: string;
  date: string;
}

interface ClassType {
  id: number;
  name: string;
  students: Student[];
}

const classes: ClassType[] = [
  {
    id: 1,
    name: "کلاس هفتم ب",
    students: [
      { id: 1, name: "محمدامین رضایی", date: "1404/06/21" },
      { id: 2, name: "مسعود فرحی", date: "1404/05/18" },
      { id: 3, name: "علی علاءالدین حسینی شیرازی", date: "1404/05/16" },
      { id: 4, name: "محمد روشنگرا", date: "1404/05/02" },
      { id: 5, name: "رضا کارمحمدی", date: "1404/03/27" },
      { id: 6, name: "علی امینی بداغ‌آبادی", date: "1404/02/12" },
      { id: 7, name: "محمد یاسر ایحدی", date: "1404/01/10" },
      { id: 8, name: "نجمالدین شریعتی", date: "1404/05/16" },
    ],
  },
  {
    id: 2,
    name: "کلاس هفتم الف",
    students: [
      { id: 9, name: "محمدامین رضایی", date: "1404/06/21" },
      { id: 10, name: "مسعود فرحی", date: "1404/05/18" },
      { id: 11, name: "علی علاءالدین حسینی شیرازی", date: "1404/05/16" },
      { id: 12, name: "محمد روشنگرا", date: "1404/05/02" },
      { id: 13, name: "رضا کارمحمدی", date: "1404/03/27" },
      { id: 14, name: "علی امینی بداغ‌آبادی", date: "1404/02/12" },
      { id: 15, name: "محمد یاسر ایحدی", date: "1404/01/10" },
      { id: 16, name: "نجمالدین شریعتی", date: "1404/05/16" },
    ],
  },
  {
    id: 3,
    name: "کلاس هفتم الف",
    students: [
      { id: 17, name: "محمدامین رضایی", date: "1404/06/21" },
      { id: 18, name: "مسعود فرحی", date: "1404/05/18" },
      { id: 19, name: "علی علاءالدین حسینی شیرازی", date: "1404/05/16" },
      { id: 20, name: "محمد روشنگرا", date: "1404/05/02" },
      { id: 21, name: "رضا کارمحمدی", date: "1404/03/27" },
      { id: 22, name: "علی امینی بداغ‌آبادی", date: "1404/02/12" },
      { id: 23, name: "محمد یاسر ایحدی", date: "1404/01/10" },
      { id: 24, name: "نجمالدین شریعتی", date: "1404/05/16" },
    ],
  },
  {
    id: 4,
    name: "کلاس هفتم الف",
    students: [
      { id: 25, name: "محمدامین رضایی", date: "1404/06/21" },
      { id: 26, name: "مسعود فرحی", date: "1404/05/18" },
      { id: 27, name: "علی علاءالدین حسینی شیرازی", date: "1404/05/16" },
      { id: 28, name: "محمد روشنگرا", date: "1404/05/02" },
      { id: 29, name: "رضا کارمحمدی", date: "1404/03/27" },
      { id: 30, name: "علی امینی بداغ‌آبادی", date: "1404/02/12" },
      { id: 31, name: "محمد یاسر ایحدی", date: "1404/01/10" },
      { id: 32, name: "نجمالدین شریعتی", date: "1404/05/16" },
    ],
  },
];

export default function ClassSelector() {

  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();
  const getSelectedStudentNames = () => {
    return selectedStudents.map((key) => {
      const [classId, studentId] = key.split("-").map(Number);
      const classData = classes.find((cls) => cls.id === classId);
      const student = classData?.students.find((stu) => stu.id === studentId);
      return student?.name || "";
    }).filter((name) => name !== "");
  };

  const [openClass, setOpenClass] = useState<number | null>(null);
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [ShowGroupDropdown, setShowGroupDropdown] = useState(false);
  const [sortType, setSortType] = useState<string | null>(null);
  const [sortLabel, setSortLabel] = useState("فیلتر");
  const [SortGroupLabel, setSortGroupLabel] = useState("کلاس");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedGroupOption, setSelectedGroupOption] = useState<string>("");
  
const [collapsed, setCollapsed] = useState(false);
  const filtersRef = useRef<HTMLDivElement | null>(null);
  const stepperRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100 && !collapsed) {
        setCollapsed(true);
        // مخفی کردن هر دو بخش
        gsap.to([filtersRef.current, stepperRef.current], {
          height: 0,
          paddingTop:5,
          paddingBottom:5,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
      } else if (currentScrollY <= 100 && collapsed) {
        setCollapsed(false);
        // نمایش هر دو بخش
        gsap.to([filtersRef.current, stepperRef.current], {
          height: "auto",
          paddingTop:10,
          paddingBottom:10,
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [collapsed]);

  const dragLineRef = useRef<HTMLDivElement | null>(null); // ref خط وسط
  const collapsedRef = useRef(collapsed);

  useEffect(() => { collapsedRef.current = collapsed }, [collapsed]);

useEffect(() => {
  const lineEl = dragLineRef.current;
  const filtersEl = filtersRef.current;
  const stepperEl = stepperRef.current;
  if (!lineEl || !filtersEl || !stepperEl) return;

  let startY = 0;
  let deltaY = 0;

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    startY = e.touches[0].clientY;

    const handleTouchMove = (moveEvent: TouchEvent) => {
      moveEvent.preventDefault();
      deltaY = moveEvent.touches[0].clientY - startY;
      const moveAmount = Math.max(Math.min(deltaY, 100), -100);
      stepperEl.style.transform = `translateY(${moveAmount}px)`;
      filtersEl.style.transform = `translateY(${moveAmount}px)`;
      stepperEl.style.transition = "transform 0s";
      filtersEl.style.transition = "transform 0s";
    };

    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);

      const threshold = 50;
      if (!collapsedRef.current && deltaY < -threshold) {
        // بالا کشیدن -> مخفی شدن
        gsap.to([filtersEl, stepperEl], {
          height: 0,
          opacity: 0,
          margin: 0,
          paddingTop:5,
          paddingBottom:5,
          transform: "translateY(0)",
          duration: 0.3,
          ease: "power2.inOut",
        });
        setCollapsed(true);
      } else if (collapsedRef.current && deltaY > threshold) {
        // پایین کشیدن -> باز شدن
        gsap.to([filtersEl, stepperEl], {
          height: "auto",
          opacity: 1,
          margin: "1rem 0",
          paddingTop:10,
          paddingBottom:10,
          transform: "translateY(0)",
          duration: 0.3,
          ease: "power2.inOut",
        });
        setCollapsed(false);
      } else {
        // کوتاه کشیده شده -> برگرد به حالت قبلی
        gsap.to([filtersEl, stepperEl], {
          transform: "translateY(0)",
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  lineEl.addEventListener("touchstart", handleTouchStart, { passive: false });

  return () => lineEl.removeEventListener("touchstart", handleTouchStart);
}, []);
  


  const toggleStudent = (classId: number, studentId: number) => {
    const key = `${classId}-${studentId}`;
    setSelectedStudents((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    );
  };

  const totalStudents = classes.reduce(
    (sum, cls) => sum + cls.students.length,
    0
  );
  const totalSelected = selectedStudents.length;

  const getSelectedCount = (classId: number) =>
    selectedStudents.filter((s) => s.startsWith(`${classId}-`)).length;

  // ✅ مرتب‌سازی بر اساس انتخاب کاربر
  const displayedClasses = classes.map((cls) => {
    let sortedStudents = [...cls.students];

    if (sortType === "alphabet") {
      sortedStudents.sort((a, b) => a.name.localeCompare(b.name, "fa"));
    } else if (sortType === "date") {
      sortedStudents.sort(
        (a, b) =>
          new Date(a.date.replace(/\//g, "-")).getTime() -
          new Date(b.date.replace(/\//g, "-")).getTime()
      );
    }

    return { ...cls, students: sortedStudents };
  });
  const filteredClasses = displayedClasses.map((cls) => {
  const filteredStudents = cls.students.filter((stu) =>
    stu.name.includes(searchText)
  );
  return { ...cls, students: filteredStudents };
});

  return (
    <div className="w-[400px] mx-auto bg-[#F9FBFF] min-h-screen pb-10 relative">
      {/* هدر بالا */}
      <div className="flex flex-col bg-white shadow-md px-5 rounded-b-3xl sticky top-0 z-20">
        {/* استپر */}
        <div 
        ref={stepperRef}
         className="flex items-center justify-center w-full px-3 py-5">
          {/* Step 1 */}
          <div className="flex items-center gap-1">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-semibold">
              1
            </div>
            <span className="text-sm font-medium text-black mb-1 pl-1">
              انتخاب کاربر
            </span>
          </div>

          {/* خط */}
          <div className="flex-1 h-[2px] bg-[#284FFF1A] "></div>

          {/* Step 2 */}
          <div className="flex items-center absolute ">
            <div className="flex items-center justify-center w-7 h-7 rounded-full outline-2  border-blue-600 text-blue-600 text-xs font-bold bg-blue-50">
              2
            </div>
          </div>

          {/* خط */}
          <div className="flex-1 h-[2px] bg-[#284FFF1A]"></div>

          {/* Step 3 */}
          <div className="flex items-center">
            <div className="flex items-center justify-center w-7 h-7 rounded-full border-2 border-blue-600 text-blue-600 text-xs font-bold bg-blue-50">
              3
            </div>
          </div>
        </div>

        {/* جستجو */}
        <div className="flex items-center justify-between gap-3">
          <div className="border-2 border-blue-600 rounded-[18px] h-[60px] w-12 flex justify-center items-center bg-[#284FFF1A]">
            <ArrowRight />
          </div>
          <div className="flex justify-between items-center border-2 border-gray-200 rounded-[18px] h-[58px] px-3 w-full">
            <Search />
            <input
              type="text"
              placeholder="جستجو"
              className="flex-1 outline-none bg-transparent mr-2"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <BigFilter />
          </div>
        </div>

        {/* مرتب‌سازی و گروه‌بندی */}
        <div 
           ref={filtersRef}
          className="flex justify-center items-center gap-4 text-center text-xs relative py-5">
          <button
            className={`flex justify-between p-5 w-1/2  font-semibold ${
              showDropdown ? "bg-white rounded-t-2xl" : "bg-[#284FFF1A] rounded-2xl"
            }`}
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <div className="flex items-center gap-2">
            <Candle />
            <span>مرتب سازی</span>
            </div>
            <span className="text-blue-500"> {sortLabel}</span>
          </button>

{showDropdown && (
  <div className="flex flex-col gap-4 py-3 absolute top-14 right-0 w-47 bg-[#E9EDFF] z-10 rounded-b-2xl ">
    
    {/* گزینه الفبا */}
    <div
      className={`flex items-center px-5 cursor-pointer ${
        selectedOption === "alphabet" ? "bg-white border-2 border-[#284FFF99]" : "bg-[#E9EDFF]"
      }`}
      onClick={() => {
        setSelectedOption("alphabet");
        setSortType("alphabet");
        setSortLabel("ترتیب الفبا");
        setShowDropdown(false);
      }}
    >
      <input
        type="radio"
        checked={selectedOption === "alphabet"}
        readOnly
      />
      <span className="w-full text-right px-4 py-2 text-sm">به ترتیب الفبا</span>
      {selectedOption === "alphabet" && (
      <VectorPath /> )}
    </div>

    {/* گزینه تاریخ */}
    <div
      className={`flex items-center px-5 cursor-pointer ${
        selectedOption === "date" ? "bg-white border-2 border-[#284FFF99]" : "bg-[#E9EDFF]"
      }`}
      onClick={() => {
        setSelectedOption("date");
        setSortType("date");
        setSortLabel("ترتیب تاریخ");
        setShowDropdown(false);
      }}
    >
      <input
        type="radio"
        checked={selectedOption === "date"}
        readOnly
      />
      <span className="w-full text-right px-4 py-2 text-sm">به ترتیب تاریخ</span>
      {selectedOption === "date" && (
      <VectorPath /> )}
    </div>

    {/* گزینه کارنامه */}
    <div
      className={`flex items-center px-5 cursor-pointer ${
        selectedOption === "report" ? "bg-white border-2 border-[#284FFF99]" : "bg-[#E9EDFF]"
      }`}
      onClick={() => {
        setSelectedOption("report");
        setSortType("report");
        setSortLabel("ترتیب کارنامه");
        setShowDropdown(false);
      }}
    >
      <input
        type="radio"
        checked={selectedOption === "report"}
        readOnly
      />
      <span className="w-full text-right px-4 py-2 text-sm">به ترتیب کارنامه</span>
      {selectedOption === "report" && (
      <VectorPath /> )}
    </div>

    {/* گزینه کلاس */}
    <div
      className={`flex items-center px-5  cursor-pointer ${
        selectedOption === "class" ? "bg-white border-2 border-[#284FFF99]" : "bg-[#E9EDFF]"
      }`}
      onClick={() => {
        setSelectedOption("class");
        setSortType("class");
        setSortLabel("ترتیب کلاس");
        setShowDropdown(false);
      }}
    >
      <input
        type="radio"
        checked={selectedOption === "class"}
        readOnly
      />
      <span className="w-full text-right px-4 py-2 text-sm">به ترتیب کلاس</span>
      {selectedOption === "class" && (
      <VectorPath /> )}
    </div>
  </div>
)}


          <button className={`flex justify-between p-5 w-1/2  font-semibold ${
              ShowGroupDropdown ? "bg-white rounded-t-2xl" : "bg-[#284FFF1A] rounded-2xl"
            }`}
          onClick={() => setShowGroupDropdown((prev) => !prev)}>
          <div className="flex items-center gap-2">
          <ForwardIcon />
            <span>گروه بندی</span>
          </div>
            <span className="text-blue-500">{SortGroupLabel}</span>
          </button>

         {ShowGroupDropdown && (
  <div className="flex flex-col gap-4 py-3 absolute top-14 left-0 w-47 bg-[#E9EDFF] z-10 rounded-b-2xl ">

    {/* گزینه الفبا */}
    <div
      className={`flex items-center px-5  cursor-pointer ${
        selectedGroupOption === "alphabet" ? "bg-white border-2 border-[#284FFF99]" : "bg-[#E9EDFF]"
      }`}
      onClick={() => {
        setSelectedGroupOption("alphabet");
        setSortType("alphabet");
        setSortGroupLabel("ترتیب کلاس");
        setShowGroupDropdown(false);
      }}
    >
      <input type="radio" checked={selectedGroupOption === "alphabet"} readOnly />
      <span className="w-full text-right px-4 py-2 text-sm">به ترتیب کلاس</span>
      {selectedGroupOption === "alphabet" && (
      <VectorPath /> )}
    </div>

    {/* گزینه تاریخ */}
    <div
      className={`flex items-center px-5 cursor-pointer ${
        selectedGroupOption === "date" ? "bg-white border-2 border-[#284FFF99]" : "bg-[#E9EDFF]"
      }`}
      onClick={() => {
        setSelectedGroupOption("date");
        setSortType("date");
        setSortGroupLabel("ترتیب تاریخ");
        setShowGroupDropdown(false);
      }}
    >
      <input type="radio" checked={selectedGroupOption === "date"} readOnly />
      <span className="w-full text-right px-4 py-2 text-sm">به ترتیب تاریخ</span>
      {selectedGroupOption === "date" && (
      <VectorPath /> )}
    </div>

    {/* گزینه پایه */}
    <div
      className={`flex items-center px-5 cursor-pointer ${
        selectedGroupOption === "grade" ? "bg-white border-2 border-[#284FFF99]" : "bg-[#E9EDFF]"
      }`}
      onClick={() => {
        setSelectedGroupOption("grade");
        setSortType("grade");
        setSortGroupLabel("ترتیب پایه");
        setShowGroupDropdown(false);
      }}
    >
      <input type="radio" checked={selectedGroupOption === "grade"} readOnly />
      <span className="w-full text-right px-4 py-2 text-sm">به ترتیب پایه</span>
      {selectedGroupOption === "grade" && (
      <VectorPath /> )}
    </div>

    {/* گزینه معدل */}
    <div
      className={`flex items-center px-5  cursor-pointer ${
        selectedGroupOption === "average" ? "bg-white border-2 border-[#284FFF99] " : "bg-[#E9EDFF]"
      }`}
      onClick={() => {
        setSelectedGroupOption("average");
        setSortType("average");
        setSortGroupLabel("ترتیب معدل");
        setShowGroupDropdown(false);
      }}
    >
      <input type="radio"
       checked={selectedGroupOption === "average"} readOnly />
      <span className="w-full text-right px-4 py-2 text-sm">به ترتیب معدل</span>
      {selectedGroupOption === "average" && (
      <VectorPath /> )}
    </div>
  </div>
)}
        </div>
        <div className="flex items-center justify-center mb-2">
        <div
  className="h-[2px] w-[70px] bg-gray-100 rounded-2xl cursor-pointer z-50"
  onClick={() => {
    const stepperEl = stepperRef.current;
    const filtersEl = filtersRef.current;
    if (!stepperEl || !filtersEl) return;

    if (!collapsed) {
      // بستن
      gsap.to([filtersEl, stepperEl], {
        height: 0,
        opacity: 0,
        margin: 0,
        paddingTop:5,
        paddingBottom:5,
        duration: 0.3,
        ease: "power2.inOut",
      });
      setCollapsed(true);
    } else {
      // باز کردن
      gsap.to([filtersEl, stepperEl], {
        height: "auto",
        opacity: 1,
        margin: "1rem 0",
        paddingTop:10,
          paddingBottom:10,
        duration: 0.3,
        ease: "power2.inOut",
      });
      setCollapsed(false);
    }
  }}
></div>




        </div>
      </div>

      {/* آمار بالای لیست */}
      <div className="bg-gray-200 flex items-center justify-between p-1.5 mt-10 px-9">
        <div className="flex items-center gap-1">
          <span className="p-1 bg-[#284FFF] rounded-full ml-1"></span>
          <span className="text-sm text-gray-400">کل کاربران</span>
          <span className="text-black font-semibold">{totalStudents}</span>
          <span className="text-sm text-gray-400">نفر</span>
        </div>
        <div className="flex items-center gap-1">
          <ArrowIcon />
          <span className="text-blue-500 font-semibold">{totalSelected}</span>
          <span className="text-sm">انتخاب شده</span>
          <FilterIcon />
        </div>
      </div>

      {/* لیست کلاس‌ها */}
      <div className="flex flex-col gap-3 mt-3.5 ">
        {filteredClasses.map((cls) => (
          <div
            key={cls.id}
            className={`rounded-2xl bg-[#F9FBFF] mx-auto${
              selectedClasses.includes(cls.id)
                ? "border-blue-500"
                : "border-gray-200"
            }`}
          >
            {/* کلاس اصلی */}
            <div
              className={`px-4 py-3 cursor-pointer rounded-2xl bg-white pr-5 mx-5 ${
                selectedClasses.includes(cls.id)
                  ? "border border-blue-500"
                  : "border border-gray-200"
              }`}
              onClick={() =>
                setOpenClass(openClass === cls.id ? null : cls.id)
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="font-medium text-gray-800 flex items-center gap-2">
                    <span className="font-bold">|</span>
                    <span>{cls.name}</span>
                  </div>
                </div>
                <div className="border-1 rounded-full border-blue-500 p-0.5">
                  <ChevronLeft size={15} className="text-blue-300" />
                </div>
              </div>

              <div className="flex justify-between items-center mr-3 mt-3">
                <div>
                  <span className="text-md font-semibold text-black">
                    {cls.students.length}
                  </span>
                  <span className="text-gray-400 mr-1">نفر</span>
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-sm  ${
                        getSelectedCount(cls.id) > 0
                          ? "text-blue-600 font-bold"
                          : "text-gray-400"
                      }`}
                    >
                      {getSelectedCount(cls.id)}
                    </span>
                    <span className="text-black text-sm">انتخاب شده</span>
                  </div>
                  <input
                    type="checkbox"
                    onClick={(e) => e.stopPropagation()}
                    checked={selectedClasses.includes(cls.id)}
                    onChange={() => {
                     if (selectedClasses.includes(cls.id)) {
                        setSelectedClasses(selectedClasses.filter((id) => id !== cls.id));
                        setSelectedStudents((prev) =>
                          prev.filter((s) => !s.startsWith(`${cls.id}-`))
                        );
                      } else {
                        setSelectedClasses([...selectedClasses, cls.id]);
                        setSelectedStudents((prev) => [
                          ...prev,
                          ...cls.students.map((stu) => `${cls.id}-${stu.id}`),
                        ]);
                      }
                    }}
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
            </div>

            {/* لیست دانش‌آموزها */}
            {openClass === cls.id && (
              <div
                className={`flex flex-col transition-colors `}
               
              >
                {cls.students.map((stu) => {
                  const isSelected = selectedStudents.includes(
                    `${cls.id}-${stu.id}`
                  );

                  return (
                    <div
                      key={stu.id}
                      className={`transition-colors ${
                        isSelected ? "bg-blue-100" : "bg-[#F9FBFF]"
                      }`}
                    >
                      <div className="flex items-center justify-between  pl-10 py-5 mr-10.5 pr-3 border-r border-dashed border-[#284FFF]  transition-colors"
                       style={{
                        borderRightStyle: "dashed",
                        borderRightWidth: "2px",
                        borderImage:
                          "repeating-linear-gradient( to bottom, #9ca3af 0, #9ca3af 6px, transparent 6px, transparent 12px ) 1",
                      }}
                      >
                        <span className="text-gray-700 text-sm">
                          {stu.name}
                        </span>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {stu.date}
                          </span>

                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleStudent(cls.id, stu.id)}
                            className="
                              w-5 h-5 
                              cursor-pointer
                              appearance-none
                              bg-white
                              border border-gray-400
                              rounded-lg
                              checked:bg-white
                              relative
                              before:content-['✔']
                              before:absolute
                              before:text-black
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
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {selectedStudents.length > 0 && (
          <div className="fixed bottom-5 -left-25 w-[460px] ">
            <div className="flex items-center gap-4">
              <div className="py-3 px-5 bg-[#284FFF] rounded-2xl flex flex-col items-center">
                <UserIcon/>
                <span className="text-white">
                {totalSelected}
                </span>
              </div>
              <button
                onClick={() => {
                  const studentNames = getSelectedStudentNames();
                  localStorage.setItem("selectedStudents", JSON.stringify(studentNames));
                  navigate("/students");
                }}
                className="p-5 border rounded-2xl bg-white text-sm text-black border-blue-500 font-semibold w-fit"
              >
                <div className="flex  gap-3">
                <span>مرحله ی بعد</span>  
                <LineArrowRight />
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
