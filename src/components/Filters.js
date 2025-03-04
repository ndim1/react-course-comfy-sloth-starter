import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {filters: {
    text,
    company,
    category,
    color,
    min_price,
    max_price,
    price,
    shipping
  },
    updateFilters,
    all_products,
    clearFilters
  } = useFilterContext()
  
  const categories = getUniqueValues(all_products, 'category')
  const companies = getUniqueValues(all_products, 'company')
  const colors = getUniqueValues(all_products, 'colors')
  return <Wrapper>
    <div className='content'>
      <form onSubmit={e => e.preventDefault()}>
        <div className='form-control'>
          <input
            type='text'
            className='search-input'
            placeholder='search'
            name='text'
            value={text}
            onChange={updateFilters}
          />
        </div>
        <div className='form-control'>
          <h5>category</h5>
          <div>
            {categories.map((c,index) => {
              return (
                <button
                  key={index}
                  onClick={updateFilters}
                  type='button'
                  name='category'
                  className={`${category === c.toLowerCase() ? 'active' : null}`}
                >
                  {c}
                </button>
              )
            })}
          </div>
        </div>
        <div className='form-control'>
          <h5>Company</h5>
          <select name='company' value={company} onChange={updateFilters} className='company'>
            {companies.map((item, index) => <option key={index} value={item}>{ item }</option>)}
          </select>
        </div>
        <div className='form-control'>
          <h5>Colors</h5>
          <div className='colors'>
            {colors.map((c, index) => {
              if (c === 'all') {
                return (
                  <button key={index} name='color' onClick={updateFilters} data-color='all' className={color === 'all' ? 'all-btn active' : 'all-btn'}>all</button>
                )
            }
            return (
              <button name='color' key={index} onClick={updateFilters} style={{ background: c }} data-color={c} className={color === c ? 'color-btn active' : 'color-btn'}>
                {color === c ? <FaCheck /> : null}
              </button>
            )
          })}
          </div>
        </div>
        <div className='form-control'>
          <h5>Price</h5>
          <p className='price'>{formatPrice(price)}</p>
          <input
            type='range'
            name='price'
            min={min_price}
            max={max_price}
            onChange={updateFilters}
            value={price}
          />
        </div>
        <div className='form-control shipping'>
          <label htmlFor='shipping'>free shipping</label>
          <input type='checkbox' id='shipping' name='shipping' checked={shipping} onClick={updateFilters} />
        </div>
        <button type='button' className='clear-btn' onClick={clearFilters}>{''} clear filters</button>
      </form>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
