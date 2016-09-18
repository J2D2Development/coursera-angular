(function() {
    'use strict';

    angular.module('app', ['ngAnimate'])
        .controller('CodeChecklistController', CodeChecklistController)
        .controller('DocChecklistController', DocChecklistController)
        .factory('ChecklistDataFactory', ChecklistDataFactory);


    CodeChecklistController.$inject = ['ChecklistDataFactory'];
    DocChecklistController.$inject = ['ChecklistDataFactory'];

    function DocChecklistController(ChecklistDataFactory) {
        var data = ChecklistDataFactory();
        var doc = this;
        this.task = '';

        doc.tasks = data.getTasks();

        doc.addTask = function() {
            data.addTask(this.task);
            this.task = '';
        }

        doc.deleteTask = function(index) {
            data.deleteTask(index);
        }
    }

    function CodeChecklistController(ChecklistDataFactory) {
        var data = ChecklistDataFactory(3);
        var code = this;
        this.task = '';

        code.tasks = data.getTasks();

        code.addTask = function() {
            try {
                data.addTask(this.task);
            } catch(error) {
                code.errorMessage = error.message;
            }
            this.task = '';
        }

        code.deleteTask = function(index) {
            data.deleteTask(index);
        }
    }

    function ChecklistDataService(limit) {
        var service = this;
        var tasks = [];

        service.addTask = function(task) {
            if(!limit || tasks.length < limit) {
                tasks.push(task);
            } else {
                throw new Error('You have too much on your plate!');
            }
        }

        service.deleteTask = function(index) {
            tasks.splice(index, 1);
        }

        service.getTasks = function() {
            return tasks;
        }
    }

    function ChecklistDataFactory() {
        var factory = function(limit) {
            return new ChecklistDataService(limit);
        }

        return factory;
    }
})();