interface TDA {
  agregar(elemento: number): boolean;
  eliminar(indice: number): number | null;
  buscar(indice: number): number | null;
}

class Conjunto implements TDA {
  private elementos: number[] = [];
  private size = 0;
  private limite = 256;

  agregar(elemento: number) {
    if (this.size < this.limite) {
      this.elementos[this.size] = elemento;
      this.size += 1;
    }

    return false;
  }

  eliminar(indice: number) {
    const elemento = this.buscar(indice);

    if (!elemento) return null;

    for (let i = 0; i < this.size; i++) {
      if (i === indice) {
        this.elementos[indice] = this.elementos[i + 1];
      }

      if (i > indice && i <= this.size - 1) {
        this.elementos[i] = this.elementos[i + 1];
      }

      if (i === this.size - 1) {
        this.elementos.splice(i);
      }
    }
    this.size -= 1;

    return elemento;
  }

  buscar(indice: number) {
    if (indice > this.size || indice < 0 || !this.elementos[indice]) {
      return null;
    }

    return this.elementos[indice];
  }

  get verConjunto() {
    return this.elementos;
  }

  get verSize() {
    return this.size;
  }

  contiene(elemento: number) {
    for (let i = 0; i < this.size; i++) {
      if (this.elementos[i] === elemento) {
        return {
          indice: i,
        };
      }
    }

    return null;
  }
}

class OperacionesConjunto {
  static intersecion(conjuntoA: Conjunto, conjuntoB: Conjunto) {
    const conjuntoIntercesion: Conjunto = new Conjunto();

    for (let i = 0; i < conjuntoA.verSize; i++) {
      for (let j = 0; j < conjuntoB.verSize; j++) {
        if (conjuntoA.verConjunto[i] === conjuntoB.verConjunto[j]) {
          conjuntoIntercesion.agregar(conjuntoA.verConjunto[i]);
        }
      }
    }
    return conjuntoIntercesion;
  }

  static union(conjuntoA: Conjunto, conjuntoB: Conjunto) {
    const conjuntoUnion: Conjunto = new Conjunto();

    for (let i = 0; i < conjuntoA.verSize; i++) {
      conjuntoUnion.agregar(conjuntoA.verConjunto[i]);
    }

    for (let j = 0; j < conjuntoA.verSize; j++) {
      conjuntoUnion.agregar(conjuntoB.verConjunto[j]);
    }

    return conjuntoUnion;
  }

  static productoCartesiano(conjuntoA: Conjunto, conjuntoB: Conjunto) {
    let productoCart = '{ ';

    for (let i = 0; i < conjuntoA.verSize; i++) {
      for (let j = 0; j < conjuntoA.verSize; j++) {
        productoCart += `(${conjuntoA.verConjunto[i]},${conjuntoB.verConjunto[j]}) `;
      }
    }
    productoCart += '}';
    return productoCart;
  }
}

const conjuntoA = new Conjunto();

// agregando numeros al conjunto
conjuntoA.agregar(1);
conjuntoA.agregar(2);
conjuntoA.agregar(3);
conjuntoA.agregar(4);
conjuntoA.agregar(5);

console.log('ConjuntoA:', conjuntoA.verConjunto);
console.log('\n\n\n');

// eliminando la posicion 1
conjuntoA.eliminar(1);
console.log('ConjuntoA:', conjuntoA.verConjunto);

// buscando valor en la posicion 3
console.log('elemento buscado:', conjuntoA.buscar(3));
console.log('\n\n\n');

const conjuntoB = new Conjunto();

conjuntoB.agregar(1);
conjuntoB.agregar(3);
conjuntoB.agregar(5);
conjuntoB.agregar(7);
conjuntoB.agregar(9);

const union = OperacionesConjunto.union(conjuntoA, conjuntoB);
const intercesion = OperacionesConjunto.intersecion(conjuntoA, conjuntoB);
const productoCartesiano = OperacionesConjunto.productoCartesiano(
  conjuntoA,
  conjuntoB
);

console.log('Union:', union.verConjunto);
console.log('Intersecion:', intercesion.verConjunto);
console.log('Producto Cartesiano:', productoCartesiano);
console.log('\n\n\n');
