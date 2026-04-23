import Cocoa
import Vision

let args = CommandLine.arguments
if args.count < 2 {
    print("Usage: ocr <image_path>")
    exit(1)
}

let path = args[1]
guard let img = NSImage(contentsOfFile: path),
      let cgImage = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    print("Failed to load image")
    exit(1)
}

let requestHandler = VNImageRequestHandler(cgImage: cgImage, options: [:])
let request = VNRecognizeTextRequest { (request, error) in
    guard let observations = request.results as? [VNRecognizedTextObservation] else { return }
    for currentObservation in observations {
        if let topCandidate = currentObservation.topCandidates(1).first {
            print(topCandidate.string)
        }
    }
}
request.recognitionLevel = .accurate

do {
    try requestHandler.perform([request])
} catch {
    print("Unable to perform the requests.")
}
