
import {overload, defaultOverload} from '../index';
import {expect} from 'chai';


class Foo {
  constructor(a) {
    this.a = a;
  }
}


class Test {
  @overload(Number)
  test(a) {
    return 'Number ' + a;
  }

  @overload(String, Number)
  test(a,b) {
    return 'String,Number ' + a + ',' + b;
  }

  @overload(Foo)
  test(a) {
    return 'Foo ' + a.a;
  }

  @defaultOverload
  test(a) {
    return 'default';
  }
}


describe('overload', function () {
  it('should work', function () {
    let t = new Test();
    expect(t.test(5)).to.equal('Number 5');
    expect(t.test('1', 2)).to.equal('String,Number 1,2');
    expect(t.test(new Foo('!'))).to.equal('Foo !');
    expect(t.test({})).to.equal('default');
  });
});
