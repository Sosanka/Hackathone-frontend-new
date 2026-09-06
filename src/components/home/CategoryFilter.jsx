const categories = [
  {
    value: "",
    label: "All Products",
    icon: "🌱",
  },
  {
    value: "vegetables",
    label: "Vegetables",
    icon: "🥬",
  },
  {
    value: "fruits",
    label: "Fruits",
    icon: "🍎",
  },
  {
    value: "grains",
    label: "Grains",
    icon: "🌾",
  },
  {
    value: "dairy",
    label: "Dairy",
    icon: "🥛",
  },
];

export default function CategoryFilter({ selected, onChange }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {categories.map((category) => {
        const active = selected === category.value;

        return (
          <button
            key={category.value}
            onClick={() => onChange(category.value)}
            className={`
                flex
                shrink-0
                items-center
                gap-2
                rounded-full
                px-5
                py-3
                text-sm
                font-semibold
                transition
                ${
                  active
                    ? "bg-green-600 text-white shadow-lg shadow-green-100"
                    : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50"
                }
              `}
          >
            <span>{category.icon}</span>

            {category.label}
          </button>
        );
      })}
    </div>
  );
}
