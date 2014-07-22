'use strict';

function Existing() {
    Existing.superclass.prototype.apply(this, arguments);
}

Y.extend(Existing, Y.BaseCore, {
    /**
    Initializing stuff.

    @method initializer
    @protected
    **/
    initializer: function () {
        Y.log('Hello World');
    }
}, {
    NAME: 'existing',
    ATTRS: {
        /**
        Foo state.

        @attribute foo
        @type {String}
        @default 'bar'
        **/
        foo: {
            value: 'bar'
        }
    }
});

Y.Existing = Existing;
