function App() {
  let name: string = 'Mina';
  name = 'Typescript';
  // name = 93; // Type 'number' is not assignable to type 'string'.ts(2322)

  const messageInfered = 'Turururoriri message Infered (String)';

  const numbers: number[] = [1, 2, 3, 4, 5];
  const boolArr: Array<boolean> = [true, false, false, true, true];
  const strArr: Array<string> = ['uno', 'dos', 'tres', 'cuatro', 'cinco'];

  let unionValue: string | number = '1';
  unionValue = 1;

  function printId(id: string | number): string {
    return `Your id is ${id}`;
  }

  function processValue(input: unknown): string {
    return `Unkown forces you using type guards (typeof, instanceof, etc.) before you can access its properties.- Your input: ${input} ${typeof input}`;
  }

  const carOne: { car: string; brand: number } = {
    car: 'Evil Cafè',
    brand: 2302,
  };
  // carOne.color = '#123'; // Property 'color' does not exist on type '{ car: string; brand: number; }'.ts(2339)

  const tomato = { name: 'Tomato', price: 2 };
  const potato = { name: 'Potato', price: 1 };
  const carrot = { name: 'Carrot' };

  const vegetables: readonly {
    readonly name: string;
    readonly price?: number;
  }[] = [tomato, potato, carrot];

  // vegetables.pop(); // Property 'pop' does not exist on type 'readonly { readonly name: string; readonly price?: number | undefined; }[]'.ts(2339)

  function createEmployee({ id }: { id: number }): {
    id: number;
    isActive: boolean;
  } {
    return { id, isActive: id % 2 === 0 };
  }

  type UserInfo = { name: string; age: number; address: string };
  type Address = { city: string; country: string };
  // Intersection of User and Address
  type UserWithAddress = UserInfo & Address;

  function getUserInfo(userInfo: UserWithAddress) {
    console.log(`User Info: 
    Name: ${userInfo.name}, 
    Age: ${userInfo.age}, 
    Address: ${userInfo.address},
    City: ${userInfo.city},
    Country: ${userInfo.country}`);
  }

  const user: UserWithAddress = {
    name: 'Alice',
    age: 30,
    address: '123 Main St',
    country: 'Uganda',
    city: 'Kampala',
  };
  getUserInfo(user);

  interface Pet {
    readonly id: number;
    breed: string;
    age: number;
    color: string;
  }
  interface Can extends Pet {
    name: string;
    legs: number;
    walk(steps: number, minutes: number): number;
  }

  const walk: Can['walk'] = (steps, minutes) => steps / minutes;
  console.log(walk(1000, 20));

  return (
    <div className='container'>
      <section>
        <h1>Hola {name.toUpperCase()}</h1>
        <h4>Nono: {messageInfered.toLowerCase()}</h4>

        {numbers.map((number) => (
          <span key={number}>{number} </span>
        ))}
        <br />
        {boolArr.map((bool, idx) => (
          <span key={idx + 1}>X {bool.toString()}</span>
        ))}
        <br />
        {strArr.map((str) => (
          <span key={str}> {str} </span>
        ))}
      </section>

      <section>
        <h2>UNIONS</h2>
        <p>let unionValue: string | number = '1';</p>
        <p>
          {' '}
          unionValue = 1; --- typeof {unionValue}={typeof unionValue}
        </p>

        <p>Union type in function params: </p>
        <code>function printId(id: string | number): string</code>
        <br />
        <code> return `Your id is $id`;</code>
        <p>{printId('19238')}</p>
        <hr />
        <p>Unkown Type</p>
        <p>{processValue(true)}</p>
        <p>{processValue('tu soñador')}</p>
        <p>{processValue(34)}</p>
      </section>

      <section>
        <h1>OBJECTS</h1>
        <p>
          To define the shape of an object explicitly, we can use inline type
          annotations.
        </p>

        <span>
          const carOne: &#123; car: string; brand: number &#125; = &#123; car:
          'Evil Cafè', brand: 2302, &#125;
        </span>
        <p>
          {carOne.car} - {carOne.brand}
        </p>
        <span>
          const carOne: &#123; car: string; brand: number &#125; = &#123; car:
          'Evil Cafè', brand: '2302', &#125;
        </span>
        <p style={{ color: '#f86f6f' }}>
          Type 'string' is not assignable to type 'number'.ts(2322) App.tsx(23,
          32): The expected type comes from property 'brand' which is declared
          here on type 'car: string; brand: number;'
        </p>

        {vegetables.map((veggie) => (
          <p key={veggie.name}>
            {veggie.name} ${veggie.price ? veggie.price : 'N/A'}
          </p>
        ))}
      </section>

      <section>
        <h2>Functions receiving objects as params</h2>
        <p>{JSON.stringify(createEmployee({ id: 1 }))}</p>
        <p>{JSON.stringify(createEmployee({ id: 2 }))}</p>
      </section>
    </div>
  );
}

export default App;
