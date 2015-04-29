app.controller("editorController", function($scope, $rootScope, $file, windowEventsFactory) {

	// $scope.files = {}; // files open
	// $scope.active = undefined; // currently viewing
	// $scope.fileHistory = [];
	//$scope.Object = Object;

	// open a new file
    $rootScope.$on('editor.open', function( event, file_path ) {
		$scope.open( file_path )
    });

	// send save file request to editor view controller
    $rootScope.$on('editor.saveRequest', function() {
		$rootScope.$emit('editor.saveRequest.' + $scope.active);
    });

	// on safe
    $rootScope.$on('editor.performSave', function() {
		$scope.save();
    });

	// on close
    $rootScope.$on('editor.close', function() {
		$scope.close( $scope.active );
    });

	// add close command to queue (why?)
    windowEventsFactory.addToQueue('close', function() {
		window.localStorage.files_open = '';

		var files_open = [];

		for( var file_path in $scope.files ) {
			files_open.push( file_path );
		}

		window.localStorage.files_open = files_open.join(',');
    });

	// open file
    $scope.open = function(file_path) {

    	$scope.$parent.file.open(file_path);
    	console.log('open');
    }

	// close current file
	$scope.close = function(file_path) {
		$scope.$parent.file.close(file_path);
    	console.log('close');
	}

	// // safe file
	// $scope.save = function() {
 //    	$file.save($scope.files, $scope.active);
 //    }

	// // get file info
	// $scope.getInfo = function(file_path) {
 //    	$file.getInfo(file_path);
 //    }

	// // get file icon
	// $scope.icon = function(file_path) {
 //    	$file.icon(file_path);
 //    }

});