angular.module('financier').controller('editAccountCtrl', function(editing, myAccount, manager, myBudg, transaction, $q, $rootScope, $scope, $stateParams) {
  const Transaction = transaction($stateParams.budgetId);

  this.editing = editing;

  this.account = myAccount;

  this.submit = () => {
    const promises = [
      myBudg.accounts.put(this.account)
    ];

    let transaction;

    if (!this.editing) {
      transaction = new Transaction({
        value: this.startingBalance * 100,
        date: this.startingBalanceDate.toISOString(),
        category: 'income',
        account: myAccount.id,
        payee: {
          type: 'INTERNAL',
          name: 'Starting Balance'
        }
      }, myBudg.transactions.put);

      manager.addAccount(this.account);

      if (transaction) {
        manager.addTransaction(transaction);
      }

      promises.push(myBudg.transactions.put(transaction));
    }


    $q.all(promises).then(() => {
      $scope.closeThisDialog();
    });

  };

});
