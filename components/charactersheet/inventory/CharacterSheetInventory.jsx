import Popup from "@/components/popup/Popup";
import Image from "next/image";
import React, { useState } from "react";

function CharacterSheetInventory({ inventory, theme, dm }) {
  const [currencies, setCurrencies] = useState([
    {
      name: "Platinum",
      amount: inventory.currency.pp,
      baseColor: "indigo",
      tone: 900,
    },
    {
      name: "Gold",
      amount: inventory.currency.gp,
      baseColor: "yellow",
      tone: 600,
    },
    {
      name: "Silver",
      amount: inventory.currency.sp,
      baseColor: "gray",
      tone: 500,
    },
    {
      name: "Copper",
      amount: inventory.currency.cp,
      baseColor: "orange",
      tone: 900,
    },
  ]);

  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const updateCurrency = (currencyName, newAmount) => {
    setCurrencies((prevCurrencies) =>
      prevCurrencies.map((currency) =>
        currency.name === currencyName
          ? { ...currency, amount: newAmount ?? 0 }
          : currency
      )
    );
  };

  const currencyDialog = (
    <Popup onDismiss={() => setSelectedCurrency(null)}>
      <div
        className={`${theme.bg} border-2 ${theme.border} p-2 rounded-lg flex flex-col gap-2`}
      >
        <h3 className="text-center">{selectedCurrency?.name}</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const amount = parseFloat(formData.get("amount"));
            const validAmount = isNaN(amount) ? 0 : amount;
            updateCurrency(selectedCurrency?.name, validAmount);
            setSelectedCurrency(null);
          }}
        >
          <div className="flex flex-col gap-3">
            <input
              name="amount"
              className={`rounded-lg p-1 w-[100px] ${theme.highlight} text-center text-xl focus:ring-1 ring-white focus:outline-none`}
              type="number"
              defaultValue={selectedCurrency?.amount}
            />
            <input
              className="bg-green-800 rounded-full p-1"
              type="submit"
              value="Save"
            />
          </div>
        </form>
      </div>
    </Popup>
  );

  const currencyCell = (label, amount, baseColor, tone) => (
    <div key={label} className="flex flex-col gap-2 p-1">
      <div
        className={`flex flex-col gap-1 p-1 bg-${baseColor}-${tone} rounded-lg border-${baseColor}-${
          tone - 300
        } border shadow-${baseColor}-${tone} shadow-md`}
        onClick={() =>
          setSelectedCurrency({
            name: label,
            amount,
          })
        }
      >
        <p className="text-center text-xl py-1">{amount}</p>
      </div>
      <h4 className="text-sm text-center">{label}</h4>
    </div>
  );

  const currencySection = (
    <>
      <div className="grid grid-cols-4 gap-2">
        {currencies.map((currency) =>
          currencyCell(
            currency.name,
            currency.amount,
            currency.baseColor,
            currency.tone
          )
        )}
      </div>
      {selectedCurrency?.name && currencyDialog}
    </>
  );

  const [selectedItem, setSelectedItem] = useState(null);

  const selectedItemPopup = (
    <Popup onDismiss={(e) => setSelectedItem(null)}>
      <div
        className={`${theme.bg} border-2 ${theme.border} p-2 rounded-lg min-w-[85vw] md:min-w-[30vw] md:max-w-[60vw] lg:max-w-[40vw] flex flex-col gap-2`}
      >
        <h2 className="text-xl text-center font-bold">{selectedItem?.name}</h2>
        <p className="text-xs">{selectedItem?.description}</p>
      </div>
    </Popup>
  );

  const attunedItemCell = (item) => (
    <div
      className="font-bold text-center p-1"
      onClick={() => {
        setSelectedItem(item);
      }}
    >
      {item.name}
    </div>
  );

  const attunedItemsSection = (
    <div className="grid grid-cols-1 gap-2">
      <h3 className="text-center text-xl">Attuned Magic Items</h3>
      {Array.from({ length: inventory.maxAttunedItems }, (_, index) => (
        <div
          key={index}
          className={`flex min-h-[32px] ${theme.bg} rounded-lg border ${theme.border} shadow-md ${theme.shadow}`}
        >
          {inventory.attunedMagicItems.length > index ? (
            <div className={`flex-1`}>
              {attunedItemCell(inventory.attunedMagicItems[index])}
            </div>
          ) : (
            <div className="bg-[#111] flex-1 rounded-lg"></div>
          )}
        </div>
      ))}
    </div>
  );

  const backpackItemCell = (item, index) => (
    <div
      key={item.item.name}
      className="flex justify-between border-b border-opacity-40 border-white p-1 gap-2"
    >
      <p className="text-sm">{item.item.name}</p>
      <p className="text-sm">{item.quantity}</p>
    </div>
  );

  const [filters, setFilters] = useState({
    "Weapons Only": {
      predicate: (p) => p.category === "weapon",
      on: false,
    },
    "Armor Only": {
      predicate: (p) => p.category === "armor",
      on: false,
    },
  });

  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  const toggleFilter = (filterName) => {
    const newFilters = { ...filters };
    const newFilter = {
      ...newFilters[filterName],
      on: !newFilters[filterName].on,
    };
    newFilters[filterName] = newFilter;
    setFilters(newFilters);
  };

  const filterDialog = (
    <Popup onDismiss={(e) => setFilterDialogOpen(false)}>
      <div
        className={`${theme.bg} border-2 ${theme.border} p-2 rounded-lg min-w-[85vw] md:min-w-[30vw] md:max-w-[60vw] lg:max-w-[40vw] flex flex-col gap-2`}
      >
        {Object.keys(filters).map((filterName) => (
          <div
            key={filterName}
            className="flex justify-between items-center p-1 "
            onClick={() => toggleFilter(filterName)}
          >
            <p>{filterName}</p>
            <div
              className={`rounded-full w-[40px] p-1 flex items-center duration-300 relative ${
                filters[filterName].on ? "bg-green-900" : "bg-black"
              }`}
            >
              <div
                className={`w-[12px] h-[12px] bg-white rounded-full transition-transform duration-300 ${
                  filters[filterName].on
                    ? "translate-x-[20px]"
                    : "translate-x-0"
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </Popup>
  );

  const openBackpackFilterDialog = () => {
    setFilterDialogOpen(true);
  };

  const getFilteredInventory = () => {
    var result = inventory.backpack;
    Object.keys(filters).forEach((key) => {
      const filter = filters[key];
      if (filter.on) result = result.filter(filter.predicate);
    });
    return result;
  };

  const backpackSection = (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <h3 className="text-center text-xl">Backpack</h3>
        <div
          className="absolute top-0 right-0 bottom-0 flex items-center justify-center"
          onClick={() => openBackpackFilterDialog()}
        >
          <Image
            src="/icons/filter_list_icon.png"
            width={24}
            height={24}
            alt="filter backpack icon"
          />
        </div>
      </div>
      <div
        className={`${theme.bg} p-2 rounded-lg ${theme.border} border ${theme.shadow} shadow-md`}
      >
        <div className="flex justify-between px-1">
          <h5 className="bold text-lg font-bold">Item</h5>
          <h5 className="bold text-lg font-bold">#</h5>
        </div>
        <hr />
        <div className="grid grid-cols-1 gap-1 pt-1">
          {getFilteredInventory().map((item) => backpackItemCell(item))}
          {getFilteredInventory().length === 0 && (
            <p className="text-center text-sm opacity-50 p-1">
              No items, check filter
            </p>
          )}
        </div>
      </div>
      {filterDialogOpen && filterDialog}
    </div>
  );

  const storedSection = <div></div>;

  return (
    <div className="flex flex-col p-2 gap-3">
      {currencySection}
      {attunedItemsSection}
      {backpackSection}
      {storedSection}
      {selectedItem?.name && selectedItemPopup}
    </div>
  );
}

export default CharacterSheetInventory;
