<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Mail\MessageReply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $messages = Message::all();
        return response()->json(['success' => true, 'data' => $messages], 200);

    }
    public function reply(Request $request, $id)
    {
        $message = Message::findOrFail($id);
        if($request->response) {
            $response = $request->response;
        } else {
            $response = "Merci pour votre message. Nous avons bien reçu
             votre demande. Nous vous répondrons dans les plus brefs délais.
              Cordialement, l'équipe de WheelsDeal.";
        }

        Mail::to($message->email)->send(new MessageReply($response));

        return response()->json(['message' => 'Response sent successfully'], 200);
    }
    public function sendEmail(Request $request)
    {
        if($request->response) {
            $response = $request->response;
        } else {
            $response = "Merci pour votre message. Nous avons bien reçu
             votre demande. Nous vous répondrons dans les plus brefs délais.
              Cordialement, l'équipe de WheelsDeal.";
        }

        $selectedMessageIds = $request->selectedMessages;
        $messages = Message::whereIn('id', $selectedMessageIds)->get();

        foreach ($messages as $message) {
            Mail::to($message->email)->send(new MessageReply($response));
        }

        return response()->json(['message' => 'Email sent successfully'], 200);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'message' => 'required'
        ]);

        // Create a new message instance
        $message = new Message();
        $message->name = $validatedData['name'];
        $message->email = $validatedData['email'];
        $message->subject = $request->subject;
        $message->message = $validatedData['message'];

        // Save the message
        $message->save();

        return response()->json(['success' => true, 'data' => $message], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function show(Message $message)
    {
        return response()->json(['success' => true, 'data' => $message], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Message $message)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'message' => 'required'
        ]);

        // Update the message
        $message->name = $validatedData['name'];
        $message->email = $validatedData['email'];
        $message->subject = $request->subject;
        $message->message = $validatedData['message'];

        // Save the message
        $message->save();

        return response()->json(['success' => true, 'data' => $message], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function destroy(Message $message)
    {
        // Delete the message
        $message->delete();

        return response()->json(['success' => true, 'data' => $message], 200);
    }
}
