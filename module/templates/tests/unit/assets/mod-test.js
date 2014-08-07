YUI.add('<%= moduleName %>-test', function (Y) {
    'use strict';

    var suite = new Y.Test.Suite('<%= moduleName %>');

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',
        'test is empty': function() {
            Y.Assert.fail('No Tests Provided For This Module');
        }
    }));

    Y.Test.Runner.add(suite);

}, 'TEST', { requires: ['test', '<%= moduleName %>'] });
