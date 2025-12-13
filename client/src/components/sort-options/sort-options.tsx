import { useState } from 'react';
import { SortOffer } from '../../types/sort';
import { SortOffersType } from '../../const';
import { JSX } from 'react';

type SortOptionsProps = {
  selectedSort: SortOffer;
  onChange: (sort: SortOffer) => void;
};

function SortOptions({ selectedSort, onChange }: SortOptionsProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((v) => !v);
  const handleSelect = (key: SortOffer) => {
    onChange(key);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get" onSubmit={(e) => e.preventDefault()}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={toggle}>
        {SortOffersType[selectedSort]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use href="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {(
          Object.keys(SortOffersType) as Array<keyof typeof SortOffersType>
        ).map((key) => {
          const k = key as SortOffer;
          const active = k === selectedSort;
          return (
            <li
              key={key}
              className={`places__option ${active ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => handleSelect(k)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { handleSelect(k); } }}
            >
              {SortOffersType[k]}
            </li>
          );
        })}
      </ul>
    </form>
  );
}

export { SortOptions };