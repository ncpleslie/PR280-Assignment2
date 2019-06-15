// Unit Testing
describe("Basic Checks for errorCheck", function () {
    'use strict'
    describe("MathCalculations", function () {
        var mathCalculations
        beforeEach(function () {
            mathCalculations = new MathCalculations()
        });
        it("Check 0. Should return false", function () {
            let sentValue = 0
            let errorCheckReturn = mathCalculations.errorCheck(sentValue)
            expect(errorCheckReturn).toBe(false)
        })
        it("Check null. Should return false", function () {
            let sentValue = null
            let errorCheckReturn = mathCalculations.errorCheck(sentValue)
            expect(errorCheckReturn).toBe(false)
        })
        it("Check 'asdasd'. Should return false", function () {
            let sentValue = 'asdasd'
            let errorCheckReturn = mathCalculations.errorCheck(sentValue)
            expect(errorCheckReturn).toBe(false)
        })
        it("Check array ([]). Should return false", function () {
            let sentValue = []
            let errorCheckReturn = mathCalculations.errorCheck(sentValue)
            expect(errorCheckReturn).toBe(false)
        })
        it("Check array ([[]]). Should return false", function () {
            let sentValue = [
                []
            ]
            let errorCheckReturn = mathCalculations.errorCheck(sentValue)
            expect(errorCheckReturn).toBe(false)
        })
        it("Check array ([[1]]). Should return false", function () {
            let sentValue = [
                [1]
            ]
            let errorCheckReturn = mathCalculations.errorCheck(sentValue)
            expect(errorCheckReturn).toBe(false)
        })
        it("Check array ([[],[]]). Should return false", function () {
            let sentValue = [
                [],
                []
            ]
            let errorCheckReturn = mathCalculations.errorCheck(sentValue)
            expect(errorCheckReturn).toBe(false)
        })
        it("Check array ([[1],[]]). Should return false", function () {
            let sentValue = [
                [1],
                []
            ]
            let errorCheckReturn = mathCalculations.errorCheck(sentValue)
            expect(errorCheckReturn).toBe(false)
        })
        it("Check array ([[1,2],[1]]). Should return false", function () {
            let sentValue = [
                [1, 2],
                [1]
            ]
            let errorCheckReturn = mathCalculations.errorCheck(sentValue)
            expect(errorCheckReturn).toBe(false)
        })
        it("Check array ([[1],[1]]). Should return false", function () {
            let sentValue = [
                [1],
                [1]
            ]
            let errorCheckReturn = mathCalculations.errorCheck(sentValue)
            expect(errorCheckReturn).toBe(true)
        })
        it("Check array ([[1,2,3],[1,2,3]]). Should return false", function () {
            let sentValue = [
                [1, 2, 3],
                [1, 2, 3]
            ]
            let errorCheckReturn = mathCalculations.errorCheck(sentValue)
            expect(errorCheckReturn).toBe(true)
        })
    })
})

describe("Unit Tests", function () {
    'use strict'
    describe("MathCalculations", function () {
        var mathCalculations
        beforeEach(function () {
            mathCalculations = new MathCalculations()
        })
        it("Check calcSum. [1,2] equal to 3", function () {
            let a = [1,2]
            let returnedValue = mathCalculations.calcSum(a)
            expect(returnedValue).toBe(3)
        })
        it("Check calcSum. [1,2] not equal to 1", function () {
            let a = [1,2]
            let returnedValue = mathCalculations.calcSum(a)
            expect(returnedValue).not.toBe(1)
        })
        it("Check calcRegression for beta1", function () {
            let returnedValue = mathCalculations.calcRegression(1,2,3,4,5)
            expect(returnedValue.beta1).toBeCloseTo(1.234)
        })
        it("Check calcRegression for beta0", function () {
            let returnedValue = mathCalculations.calcRegression(1,2,3,4,5)
            expect(returnedValue.beta0).toBeCloseTo(0.0638)
        })
        it("Check calcCorrelation for beta0", function () {
            let returnedValue = mathCalculations.calcCorrelation(7747.7,5,580,59.2,74498,830.14)
            expect(returnedValue).toBeCloseTo(0.8312)
        })
        
    })
})

// Integration Testing
describe("Basic Check For Original Source Code", function () {
    'use strict'
    describe("MathCalculations", function () {
        var mathCalculations
        beforeEach(function () {
            mathCalculations = new MathCalculations()
        });
        it("should have an correlation function", function () {
            expect(typeof mathCalculations.initCalculations).toBe('function')
        })

        it("should have an errorCheck function", function () {
            expect(typeof mathCalculations.errorCheck).toBe('function')
        })
        it("should have an calcRegression function", function () {
            expect(typeof mathCalculations.calcRegression).toBe('function')
        })
        it("should have an calcCorrelation function", function () {
            expect(typeof mathCalculations.calcCorrelation).toBe('function')
        })
        it("should have an calcSum function", function () {
            expect(typeof mathCalculations.calcSum).toBe('function')
        })
    })
})

describe("Basic Error Check on correlation", function () {
    'use strict'
    describe("MathCalculations", function () {
        var mathCalculations
        beforeEach(function () {
            mathCalculations = new MathCalculations()
        });

        it("Check array ([]). Should return Error", function () {
            let sentValue = []
            let correlationCheck = mathCalculations.initCalculations(sentValue)
            expect(correlationCheck).toBe('Error')
        })
        it("Check array ([[]]). Should return Error", function () {
            let sentValue = [
                []
            ]
            let correlationCheck = mathCalculations.initCalculations(sentValue)
            expect(correlationCheck).toBe('Error')
        })
        it("Check array ([[1]]). Should return Error", function () {
            let sentValue = [
                [1]
            ]
            let correlationCheck = mathCalculations.initCalculations(sentValue)
            expect(correlationCheck).toBe('Error')
        })
        it("Check array ([[],[]]). Should return Error", function () {
            let sentValue = [
                [],
                []
            ]
            let correlationCheck = mathCalculations.initCalculations(sentValue)
            expect(correlationCheck).toBe('Error')
        })
        it("Check array ([[1],[]]). Should return Error", function () {
            let sentValue = [
                [1],
                []
            ]
            let correlationCheck = mathCalculations.initCalculations(sentValue)
            expect(correlationCheck).toBe('Error')
        })
        it("Check array ([[1,2],[1]]). Should return Error", function () {
            let sentValue = [
                [1, 2],
                [1]
            ]
            let correlationCheck = mathCalculations.initCalculations(sentValue)
            expect(correlationCheck).toBe('Error')
        })
        it("Check array ([[1],[1]]). Should return an Object", function () {
            let sentValue = [
                [1],
                [1]
            ]
            let correlationCheck = mathCalculations.initCalculations(sentValue)
            expect(correlationCheck).toEqual(jasmine.any(Object))
        })
        it("Check array ([[1,2,3],[1,2,3]]). Should return an object", function () {
            let sentValue = [
                [1, 2, 3],
                [1, 2, 3]
            ]
            let correlationCheck = mathCalculations.initCalculations(sentValue)
            expect(correlationCheck).toEqual(jasmine.any(Object))
        })
    })
})

describe("Functionality Tests for correlation", function () {
    'use strict'
    describe("MathCalculations", function () {
        var mathCalculations
        beforeEach(function () {
            mathCalculations = new MathCalculations()
        });
        it("Check array ([[1,2,3],[1,2,3]]). Should return 1", function () {
            let sentValue = [
                [1, 2, 3],
                [1, 2, 3]
            ]
            let correlationCheck = mathCalculations.initCalculations(sentValue)
            expect(correlationCheck.correlationResult).toBe(1)
        })
        it("Check array ([[3,2,1],[1,2,3]]). Should return 1", function () {
            let sentValue = [
                [3, 2, 1],
                [1, 2, 3]
            ]
            let correlationCheck = mathCalculations.initCalculations(sentValue)
            expect(correlationCheck.correlationResult).toBe(1)
        })

        it("Check array ([[83,116,186,81,114],[11.2,9.3,21.6,6.9,10.2]]). Should be close to 0.831264", function () {
            let sentValue = [
                [83, 116, 186, 81, 114],
                [11.2, 9.3, 21.6, 6.9, 10.2]
            ]
            let correlationCheck = mathCalculations.initCalculations(sentValue)
            expect(correlationCheck.correlationResult).toBeCloseTo(0.831264)
        })
        it("Check array ([[83,116,186,81,100],[20,9.3,21.6,6.9,10.2]]). Should NOT beclose to 0.831264", function () {
            let sentValue = [
                [83, 116, 186, 81, 100],
                [20, 9.3, 21.6, 6.9, 10.2]
            ]
            let correlationCheck = mathCalculations.initCalculations(sentValue)
            expect(correlationCheck.correlationResult).not.toBeCloseTo(0.831264)
        })
        it("Check array ([[160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601]). Should NOT be 1", function () {
            let sentValue = [
                [160, 591, 114, 229, 230, 270, 128, 1657, 624, 1503],
                [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601]
            ]
            let correlationCheck = mathCalculations.initCalculations(sentValue)
            expect(correlationCheck.correlationResult).not.toBe(1)
        })
        it("Check array ([[160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601]). Should be close to 0.9956", function () {
            let sentValue = [
                [160, 591, 114, 229, 230, 270, 128, 1657, 624, 1503],
                [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601]
            ]
            let correlationCheck = mathCalculations.initCalculations(sentValue)
            expect(correlationCheck.correlationResult).toBeCloseTo(0.9956)
        })
    })
})

describe("Functionality Tests for regression - beta1", function () {
    'use strict'
    describe("MathCalculations", function () {
        var mathCalculations
        beforeEach(function () {
            mathCalculations = new MathCalculations()
        });
        it("Check array ([[1,2,3],[1,2,3]]). Should return 1", function () {
            let sentValue = [
                [1, 2, 3],
                [1, 2, 3]
            ]
            let regressionCheck = mathCalculations.initCalculations(sentValue)
            expect(regressionCheck.regressionResult.beta1).toBe(1)
        })
        it("Check array ([[3,2,1],[1,2,3]]). Should return -1", function () {
            let sentValue = [
                [3, 2, 1],
                [1, 2, 3]
            ]
            let regressionCheck = mathCalculations.initCalculations(sentValue)
            expect(regressionCheck.regressionResult.beta1).toBe(-1)
        })

        it("Check array ([[83,116,186,81,114],[11.2,9.3,21.6,6.9,10.2]]). Should be close to 0.121986", function () {
            let sentValue = [
                [83, 116, 186, 81, 114],
                [11.2, 9.3, 21.6, 6.9, 10.2]
            ]
            let regressionCheck = mathCalculations.initCalculations(sentValue)
            expect(regressionCheck.regressionResult.beta1).toBeCloseTo(0.121986)
        })
        it("Check array ([[83,116,186,81,100],[20,9.3,21.6,6.9,10.2]]). Should NOT beclose to 0.831264", function () {
            let sentValue = [
                [83, 116, 186, 81, 100],
                [20, 9.3, 21.6, 6.9, 10.2]
            ]
            let regressionCheck = mathCalculations.initCalculations(sentValue)
            expect(regressionCheck.regressionResult.beta1).not.toBeCloseTo(0.831264)
        })
        it("Check array ([[160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601]). Should NOT be 1", function () {
            let sentValue = [
                [160, 591, 114, 229, 230, 270, 128, 1657, 624, 1503],
                [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601]
            ]
            let regressionCheck = mathCalculations.initCalculations(sentValue)
            expect(regressionCheck.regressionResult.beta1).not.toBe(1)
        })
        it("Check array ([[160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601]). Should be close to 1.091345", function () {
            let sentValue = [
                [160, 591, 114, 229, 230, 270, 128, 1657, 624, 1503],
                [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601]
            ]
            let regressionCheck = mathCalculations.initCalculations(sentValue)
            expect(regressionCheck.regressionResult.beta1).toBeCloseTo(1.091345)
        })
    })
})

describe("Functionality Tests for regression - beta0", function () {
    'use strict'
    describe("MathCalculations", function () {
        var mathCalculations
        beforeEach(function () {
            mathCalculations = new MathCalculations()
        });
        it("Check array ([[1,2,3],[1,2,3]]). Should return 0", function () {
            let sentValue = [
                [1, 2, 3],
                [1, 2, 3]
            ]
            let regressionCheck = mathCalculations.initCalculations(sentValue)
            expect(regressionCheck.regressionResult.beta0).toBe(0)
        })
        it("Check array ([[3,2,1],[1,2,3]]). Should return 4", function () {
            let sentValue = [
                [3, 2, 1],
                [1, 2, 3]
            ]
            let regressionCheck = mathCalculations.initCalculations(sentValue)
            expect(regressionCheck.regressionResult.beta0).toBe(4)
        })

        it("Check array ([[83,116,186,81,114],[11.2,9.3,21.6,6.9,10.2]]). Should be close to -2.310457", function () {
            let sentValue = [
                [83, 116, 186, 81, 114],
                [11.2, 9.3, 21.6, 6.9, 10.2]
            ]
            let regressionCheck = mathCalculations.initCalculations(sentValue)
            expect(regressionCheck.regressionResult.beta0).toBeCloseTo(-2.310457)
        })
        it("Check array ([[83,116,186,81,100],[20,9.3,21.6,6.9,10.2]]). Should NOT beclose to 0.831264", function () {
            let sentValue = [
                [83, 116, 186, 81, 100],
                [20, 9.3, 21.6, 6.9, 10.2]
            ]
            let regressionCheck = mathCalculations.initCalculations(sentValue)
            expect(regressionCheck.regressionResult.beta0).not.toBeCloseTo(0.831264)
        })
        it("Check array ([[160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601]). Should NOT be 1", function () {
            let sentValue = [
                [160, 591, 114, 229, 230, 270, 128, 1657, 624, 1503],
                [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601]
            ]
            let regressionCheck = mathCalculations.initCalculations(sentValue)
            expect(regressionCheck.regressionResult.beta0).not.toBe(1)
        })
        it("Check array ([[160,591,114,229,230,270,128,1657,624,1503],[186,699,132,272,291,331,199,1890,788,1601]). Should be close to 38.00519", function () {
            let sentValue = [
                [160, 591, 114, 229, 230, 270, 128, 1657, 624, 1503],
                [186, 699, 132, 272, 291, 331, 199, 1890, 788, 1601]
            ]
            let regressionCheck = mathCalculations.initCalculations(sentValue)
            expect(regressionCheck.regressionResult.beta0).toBeCloseTo(38.00519)
        })
    })
})